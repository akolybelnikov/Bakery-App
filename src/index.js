import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import './styles/index.scss';
import './styles/_bulma.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Amplify, {Auth} from "aws-amplify";

// window.LOG_LEVEL = 'DEBUG'

Amplify.configure({
    Auth: {
        identityPoolId: process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID,
        region: process.env.REACT_APP_AWS_COGNITO_PROJECT_REGION,
        userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_AWS_COGNITO_WEBCLIENT_ID,
        mandatorySignIn: false
    }
});

(async function initialAuth() {
    try {
        const info = await Auth.currentUserInfo()
        if (!info) await Auth.signIn(process.env.REACT_APP_DEFAULT_USER_EMAIL, process.env.REACT_APP_DEFAULT_USER_PASSWORD)
        ReactDOM.render(
            <Router><App/></Router>, document.getElementById('root'));
    } catch (e) {
        console.error(e)
    }
})()

serviceWorker.unregister();
