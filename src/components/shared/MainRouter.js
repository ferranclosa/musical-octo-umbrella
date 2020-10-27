import React, { Fragment } from 'react';
import {  Route, Switch } from 'react-router-dom'
import GroupList from '../menus/menugroups/GroupList'
import NotImplemented from "../NotImplemented";
import Home from '../shared/Home'

const MainRouter = () => {

    return (
        <div>

                <Switch>
                    <Route exact path={"/"} render={Home}/> 
                    <Route exact path={"/route_Z2"} render={(props) => <GroupList {...props} />}/>
                    <Route  render={(props) => <NotImplemented {...props} />}/>
                </Switch>

        </div>
    )
}
export default MainRouter