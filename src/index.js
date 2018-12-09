import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import './styles/index.scss';
import './styles/_bulma.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify from "aws-amplify";

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

ReactDOM.render(<Router><App/></Router>, document.getElementById('root'));

serviceWorker.unregister();
