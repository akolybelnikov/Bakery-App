import React from "react";
import {Switch} from "react-router-dom";
import AppliedRoute from './components/Router/AppliedRoute'
import AsyncComponent from './components/Router/AsyncComponent'
import AuthenticatedRoute from './components/Router/AuthenticatedRoute'
import UnauthenticatedRoute from './components/Router/UnauthenticatedRoute'

const AsyncHome = AsyncComponent(() => import ('./views/Home'))
const AsyncLogin = AsyncComponent(() => import ('./views/Login'))
const AsyncUserProfile = AsyncComponent(() => import ('./views/UserProfile'))

export default({childProps}) => <Switch>
    <AppliedRoute path="/" exact component={AsyncHome} props={childProps}/>
    <UnauthenticatedRoute path="/login" exact component={AsyncLogin} props={childProps}/>
    <AuthenticatedRoute path="/user" exact component={AsyncUserProfile} props={childProps}/>
</Switch>;