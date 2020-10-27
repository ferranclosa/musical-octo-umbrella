import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {List, ListItem, ListItemText, Collapse, Typography} from "@material-ui/core";
import { ExpandLess, ExpandMore} from '@material-ui/icons'
import { useHistory, useLocation  } from 'react-router-dom'



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    nested: {
        paddingLeft: theme.spacing(4)
    }
}))


export default function NestedList(props) {
    let history = useHistory();
    let location = useLocation()

    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [level, setLevel] = useState('')
    const [group, setGroup] = useState({
        mgCode:'',
        mgLabel:'',
        mgRoute:''
    })
    const [functions, setFunctions] = useState([])
    const [selectedIndex, setSelectedIndex] = useState('')

    useEffect(() =>{
        //setLevel(auth.provide)
        if(props.mgCode !== undefined){
            setGroup({mgCode: props.mgCode, mgLabel: props.mgLabel, mgRoute: props.mgRoute})
            setFunctions(props.mgFunctions)
        }
    }, [props])

    const handleClick = ()=>{
        setOpen(!open)
    }

    const handleListItemClick = (event, index) => {
        event.preventDefault()
        setSelectedIndex(index)
        history.push(index)
    }



    return (
        <List component="nav"
              aria-labelledby="nested-list-subheader"
              classNema={classes.root}
        >
            <ListItem button onClick={handleClick}>
                <ListItemText primary={<Typography>{group.mgLabel}</Typography>}
                />
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {functions
                    .sort((a, b) => parseInt(a.mfSortBy) - parseInt(b.mfSortBy))
                    .filter(functions => functions.mfActive )
                    .filter(functions => functions.mfLabel != null)
                    .filter(functions => functions.mfAccessLevel <= level)
                    .map(({mfCode, mfLabel, mfRoute}, idx) =>(
                    <List component="div" disablePadding>
                        <ListItem
                            alignItems="flex-start"
                            button
                            className={classes.nested}
                            key={idx}
                            onClick={(e) => handleListItemClick(e, mfRoute)}
                                  >
                            <ListItemText primary={<Typography>{mfLabel}</Typography>} />
                                      </ListItem>

                    </List>
                ))}
            </Collapse>
        </List>
    )
}