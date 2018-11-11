import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import './styles/index.scss';
import './styles/_bulma.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Rehydrated} from 'aws-appsync-react'
import {ApolloProvider} from 'react-apollo'
import Client from 'aws-appsync'
import Amplify from "aws-amplify";

Amplify.configure({
    API: {
        aws_appsync_graphqlEndpoint: process.env.REACT_APP_AWS_APPSYNC_GRAPHQLENDPOINT,
        aws_appsync_region: process.env.REACT_APP_AWS_APPSYNC_REGION,
        aws_appsync_authenticationType: process.env.REACT_APP_AWS_APPSYN_AUTHENTICATIONTYPE,
        aws_appsync_apiKey: process.env.REACT_APP_AWS_APPSYNC_APIKEY
    }
});

const client = new Client({
    url: process.env.REACT_APP_AWS_APPSYNC_GRAPHQLENDPOINT,
    region: process.env.REACT_APP_AWS_APPSYNC_REGION,
    auth: {
        type: process.env.REACT_APP_AWS_APPSYN_AUTHENTICATIONTYPE,
        apiKey: process.env.REACT_APP_AWS_APPSYNC_APIKEY
    },
    disableOffline: false
})

const AppWithApollo = () => (
    <ApolloProvider client={client}>
        <Rehydrated>
            <App/>
        </Rehydrated>
    </ApolloProvider>
)

ReactDOM.render(
    <Router><AppWithApollo/></Router>, document.getElementById('root'));

serviceWorker.unregister();
