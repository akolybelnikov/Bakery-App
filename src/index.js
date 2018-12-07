import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './styles/index.scss';
import './styles/_bulma.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Rehydrated } from 'aws-appsync-react'
import { ApolloProvider } from 'react-apollo'
import Client from 'aws-appsync'
import Amplify, { Auth } from "aws-amplify";

// window.LOG_LEVEL = 'DEBUG'

Amplify.configure({
    Auth: {
        identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID,
        region: process.env.REACT_APP_AWS_APPSYNC_REGION,
        userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_AWS_WEBCLIENT_ID,
        mandatorySignIn: false
    }
});

const unauthenticatedClient = new Client({
    url: process.env.REACT_APP_AWS_APPSYNC_GRAPHQLENDPOINT,
    region: process.env.REACT_APP_AWS_APPSYNC_REGION,
    auth: {
        type: process.env.REACT_APP_AWS_APPSYNC_AUTHENTICATIONTYPE,
        credentials: () => Auth.currentCredentials()
    },
    disableOffline: true,
})

const AppWithApollo = () => (
    <ApolloProvider client={unauthenticatedClient}>
        <Rehydrated>
            <App />
        </Rehydrated>
    </ApolloProvider>
)

ReactDOM.render(
    <Router><AppWithApollo /></Router>, document.getElementById('root'));

serviceWorker.unregister();
