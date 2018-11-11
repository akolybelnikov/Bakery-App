import React from "react";
import {Switch} from "react-router-dom";
import AppliedRoute from './components/AppliedRoute'
import AsyncComponent from './components/AsyncComponent'

const AsyncHome = AsyncComponent(() => import ('./views/Home'))

export default({childProps}) => <Switch>
    <AppliedRoute path="/" exact component={AsyncHome} props={childProps}/>
</Switch>;