import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import GroupList from '../menus/menugroups/GroupList';
import FunctionList from '../menus/menufunctions/FunctionList'
import MenuGroupAdd from '../menus/menugroups/MenuGroupAdd';
import MenuGroupView from '../menus/menugroups/MenuGroupView';
import MenuGroupEdit from '../menus/menugroups/MenuGroupEdit'
import NotImplemented from '../NotImplemented';
import Home from '../shared/Home';

const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path={'/'} render={Home} />
        <Route exact path={'/route_Z2'} render={props => <GroupList {...props} />} />
        <Route exact path={'/route_Z2F6'} render={props => <MenuGroupAdd {...props} />} />
        <Route exact path={'/route_Z2Opt04'} render={props => <MenuGroupView {...props} requestToDelete={true} />} />
        <Route exact path={'/route_Z2Opt05'} render={props => <MenuGroupView {...props} requestToDelete={false} />} />
        <Route exact path={'/route_Z2Opt02'} render={props => <MenuGroupEdit {...props}  />} />
        <Route exact path={'/route_Z3'} render={props => <FunctionList {...props}  />} />
        
        
        

        <Route render={props => <NotImplemented {...props} />} />
      </Switch>
    </div>
  );
};
export default MainRouter;
