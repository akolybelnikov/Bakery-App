import React, {Component} from 'react'
import Routes from "./Routes";
import {Rehydrated} from 'aws-appsync-react'
import {ApolloProvider} from 'react-apollo'
import AWSAppSyncClient from 'aws-appsync'
import {Auth} from "aws-amplify";

import {Container} from 'bloomer'
import {ThemeProvider} from 'styled-components'
import styled from 'styled-components'
import Header from './components/Header'
import {maxMedia, minMedia} from './styles/style-utils'

const theme = {
  primary: '#52082d',
  info: '#331507',
  success: '#eaccb2',
  primaryShadow: 'rgba(82, 8, 45, 0.3)',
  infoShadow: 'rgba(51, 21, 7, 0.3)',
  successShadow: 'rgba(234, 204, 178, 0.3)'
}

const RootContainer = styled(Container)`
  ${minMedia.touch `padding-top: 6rem;`};
  ${maxMedia.touch `padding-top: 5.25rem;`};
  color: ${props => props.theme.info}!important;
`

const authConfig = {
  type: process.env.REACT_APP_AWS_APPSYNC_AUTHENTICATIONTYPE,
  jwtToken: async() => (await Auth.currentSession())
    .getAccessToken()
    .getJwtToken()
}

const client = new AWSAppSyncClient({
  url: process.env.REACT_APP_AWS_APPSYNC_GRAPHQLENDPOINT,
  region: process.env.REACT_APP_AWS_APPSYNC_REGION,
  auth: authConfig,
  disableOffline: true,
  complexObjectsCredentials: () => Auth.currentCredentials()
})

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      busy: false,
      isAuthenticated: false,
      userHasAuthenticated: false,
      isAuthenticating: false
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({isAuthenticated: authenticated})
  }

  userIsAuthenticating = authenticating => {
    this.setState({isAuthenticating: authenticating})
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      isAuthenticating: this.state.isAuthenticating,
      userHasAuthenticated: this.userHasAuthenticated
    }
    return (
      <ThemeProvider theme={theme}>
        <RootContainer>
          <Header
            isAuthenticated={this.state.isAuthenticated}
            userHasAuthenticated={this.userHasAuthenticated}/>
          <Routes childProps={childProps}/>
        </RootContainer>
      </ThemeProvider>
    );
  }
}

export default() => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App/>
    </Rehydrated>
  </ApolloProvider>
)