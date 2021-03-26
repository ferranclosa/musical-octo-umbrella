import React, {useState, useMemo, useEffect, useContext} from 'react'
import {AuthContext} from "./context/AuthContext";
import clsx from "clsx"
import AuthService from "../../services/AuthService";
import NestedMenu from "./NestedMenu";
import auth from '../auth/auth-helper'
import { useHistory, useLocation  } from 'react-router-dom'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
import MenuService from "../../services/MenuService";
import colors from '../shared/styles/colors'
import HomeIcon from "@material-ui/icons/Home"
import MenuIcon from "@material-ui/icons/Menu"

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MenuList from '@material-ui/core/MenuList'
import Divider from '@material-ui/core/Divider'

import AppBar from "@material-ui/core/AppBar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Typography from "@material-ui/core/Typography"
import Grid from '@material-ui/core/Grid'
import Toolbar from "@material-ui/core/Toolbar";
import {IconButton} from "@material-ui/core";
import {MenuContext} from "./context/MenuContext";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer"
import theme from "./styles/Theme";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex', 
        display:'-ms-flexbox',
        position:'relative'

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none'
    },
    appBar:{
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp, 
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px`,
        marginLeft: drawerWidth,
        transition: theme.transitions.easing.sharp,
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.leavingScreen,
    },
    toolbarButtonsRight: {
        marginRight: 'auto',
        
    },
    
    toolbarButtons: {
        marginLeft: 'auto',
    },
    drawerPaper: {
        width: drawerWidth,

    },
    drawer: {
       width: drawerWidth, 
       flexShrink: 0, 
    }, 
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        //toolbar: theme.mixings.toolbar,
        justifyContent: 'flex-end'
    }, 
    content:{
        flexGrow: 1, 
        padding: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharps, 
            duration: theme.transitions.duration.leavingScreen,
        })
    }, 
    contentShift:{
        transition: theme.transitions.create('margin' ,{
            easing: theme.transitions.easing.easeOut, 
            duration: theme.transitions.duration.enteringScreen,
        })
    }
}));
const TopBar = (props) => {
    const classes = useStyles()
    let history  = useHistory()
    let location = useLocation()
    const theme = useTheme()

    //  const [loaded , setLoaded ] = useState(false)
    const [open, setOpen] = useState(false)
    const {user, setUser} = useContext(AuthContext)
    const {menu, setMenu} = useContext(MenuContext)
    const [groups, setGroups] = useState([])
    const [functions, setFunctions] = useState([])
    const [level, setLevel] = useState('')


    const  isUserLoggedIn= () => {
        if (sessionStorage.getItem('currentUser')) {
            setUser({...user, currentUser: sessionStorage.getItem('currentUser'), loggedIn: true})
        } else {
            setUser({...user, currentUser: '', loggedIn: false})
        }
    }

    useEffect( () => {
        isUserLoggedIn()        
    }, [])

    const OnClick = content => () => {
        setOpen(false)
    }
    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }
    const login = () => {
        history.push('/login')
    }
    const logout = () => {
        const data = {
            userName: sessionStorage.getItem('currentUser')
        }
        AuthService.signOut(data)
            .then(response => (response.data.returnCode === "00"
                ? (
                       setUser({...user, currentUser: '', loggedIn: false}),
                       setMenu({...menu, header: ''}),
                       history.push('/')
                )
                : (
                    toast.error(response.data.returnLabel),
                    toast.warning(response.data.returnMessages)
                    
                ))
            )
            auth.clearJWT()
   
        }



    const provideMenus = useMemo(() => {
        const pageable = {
            pageNo: 0,
            pageSize: 50,
            sortBy: 'mgSortBy',
            sortDirection: 'asc'

        }
        MenuService.findFunctions(pageable)
            .then(response => (response.data.returnCode === "00"
                    ? (
                            setGroups(response.data.menuGroups),
                            setFunctions(groups.mgFunctions),
                            setMenu({...menu, loaded: true})
                    )
                    : setGroups([])
            ))
            .catch(e => {toast.error(e)})
    }, []
    );

    return (
        <div className='uk-navbar uk-navbar-container' style={{backGroundColor: colors.navColor}}>
            <CssBaseline/>
            <Grid container>
                <Grid item xs={12}>
                    <AppBar position="fixed" color="inherit"
                            className={clsx(classes.appBar, {[classes.appBarShift]: open})}>
                        <Toolbar
                            color="black">
                            <IconButton color="inherit"
                                        aria-label="open drawer"
                                        onClick={handleDrawerOpen}
                                        edge="start"
                                        className={clsx(classes.menuButton, open && classes.hide)}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap>
                                {menu.header === '' ?
                                    "Home Page"
                                    : menu.header}
                            </Typography>
                            <div className={classes.toolbarButtons}>
                                {user.loggedIn == true  ?
                                    null
                                    :
                                    <IconButton color="inherit" component={Link} to={"/"}>
                                        <HomeIcon/>
                                    </IconButton>
                                }
                            </div>
                            
                            <div className={classes.toolbarButtons}>
                                {user.loggedIn == true ? 
                                <Button onClick={logout}> <Typography >Logout {auth.getSessionCurrentUser()}</Typography> </Button> 
                                :
                                <Button onClick={login}> <Typography >Login</Typography> </Button> 
                               }
                            </div>
                           

                            
                        </Toolbar>
                    </AppBar>
                </Grid>
            </Grid>
            <Drawer
                className={classes.drawer}
                variant="temporary"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <MenuList>
                    {groups
                          .filter(group => group.mgActive)
                          //.filter(group => group.mgAccessLevel <= level)
                          .filter(group => group.mgFunctions.length > 0)
                          .map(({mgLabel, mgCode, mgRoute, mgFunctions}, i) => (
                            <NestedMenu
                                {...props}
                                key={i}
                                mgCode={mgCode}
                                mgLabel={mgLabel}
                                mgRoute={mgRoute}
                                mgFunctions={mgFunctions}
                            >

                            </NestedMenu>
                        ))
                    }

                </MenuList>
            </Drawer>
            <main className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}>
                {props.children}

            </main>


        </div>

    )

}
export default TopBar