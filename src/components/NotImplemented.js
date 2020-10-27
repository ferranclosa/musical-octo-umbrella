import React , { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import GroupList from "./menus/menugroups/GroupList";
import TopBar from "./shared/TopBar";
import { Paper } from '@material-ui/core';


const NotImplemented = (props) => {
    const classes = {props}
    return (
        <div>
            <Grid container >
                <Paper>
                    <div className={classes.toolbar}></div>
                    </Paper> 
               
            </Grid>
            <Grid container >
                <Grid item xs={12}>
                    <h1 align='center'>
                    <br/>
                          Not Implemented yet
                    </h1>
                  
                </Grid>
                <Grid item xs={12}>
                    <h2 align= 'center'>
                        This route is not yet implemented
                    </h2>
                    <h3 align='center'>
                        This is created and exposed in develepment phase while waiting for production deployment
                    </h3>
                </Grid>

            </Grid>
        </div>
    )

}


export default NotImplemented