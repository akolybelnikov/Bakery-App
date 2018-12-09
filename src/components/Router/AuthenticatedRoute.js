import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default ({ component: C, props: cProps, ...rest }) => 
    <Route
        {...rest}
        render={props =>
            cProps.isAuthenticated
                ? <C {...props} {...cProps} />
                : <Redirect to={`/authenticate?redirect=${props.location.pathname}${props.location.search}`}/>
        }
    />