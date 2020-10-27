import React, { useState, useMemo, Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from "react-bootstrap";
import CssBaseline from "@material-ui/core/CssBaseline";
import { AuthContext } from './components/shared/context/AuthContext'
import { MenuContext } from "./components/shared/context/MenuContext";
import TopBar from './components/shared/TopBar'
import theme from "./components/shared/styles/Theme";

import './App.css';
import { Grid, makeStyles } from "@material-ui/core";
import MainRouter from "./components/shared/MainRouter";


function App() {
    const [user, setUser] = useState({});

    const [menu, setMenu] = useState({
        header: '',
        menus: [],
        needsRefresh: false,
        closeDrawer: false,
       loaded: false
    })

    const valueAuth = useMemo(() => ({user, setUser}), [user, setUser]);
    const valueMenu = useMemo(() => ({menu, setMenu}), [menu, setMenu]);
    return (
        <Fragment>
            <CssBaseline/>
         
                <ThemeProvider theme={{theme}}>
                    <ToastContainer
                        autoClose={3000}
                        position="top-right"
                        hideProgressBar={true}
                        closeOnClick={true}
                        pauseOnHover={true}
                        rtl={false}
                        draggable={true}
                        style={{width: "auto"}}
                    />
                    <AuthContext.Provider value={valueAuth}>
                        <MenuContext.Provider value={valueMenu}>
                            <Grid container alignItems="center">
                                <Grid item xs={6} margin="flex-start">
                
                                 <TopBar />
                                </Grid>
                                <Grid item xs={12} marginLeft={5} marginTop={10}>
                                    <MainRouter/>
                                </Grid>
                            </Grid>
                        </MenuContext.Provider>
                    </AuthContext.Provider>

                </ThemeProvider>

        </Fragment>

    );
}

export default App;
