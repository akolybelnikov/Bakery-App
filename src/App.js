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

async function init__login() {
  const info = await Auth.currentUserInfo()
  if (!info) {
    await Auth.signIn(process.env.REACT_APP_DEFAULT_USER_EMAIL, process.env.REACT_APP_DEFAULT_USER_PASSWORD)
  }
  const creds = await Auth.currentSession()
  return creds
    .getAccessToken()
    .getJwtToken()
}

const authConfig = {
  type: process.env.REACT_APP_AWS_APPSYNC_AUTHENTICATIONTYPE,
  jwtToken: async() => (await init__login())
}

const client = new AWSAppSyncClient({
  url: process.env.REACT_APP_AWS_APPSYNC_GRAPHQLENDPOINT,
  region: process.env.REACT_APP_AWS_APPSYNC_REGION,
  auth: authConfig,
  complexObjectsCredentials: () => Auth.currentCredentials(),
  offlineConfig: {
    callback: (err, succ) => {
      if (err) {
        // eslint-disable-next-line no-unused-vars
        const {mutation, variables} = err
        console.warn(`Error for ${mutation}`, err)
      } else {
        // eslint-disable-next-line no-unused-vars
        const {mutation, variables} = succ
        console.info(`Success for ${mutation}`, succ)
      }
    }
  }
})

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      busy: false,
      isAuthenticated: false,
      userHasAuthenticated: false,
      isAuthenticating: false,
      username: null
    };
  }

  async componentDidMount() {
    try {
      const info = await Auth.currentUserInfo()
      if (info && info.attributes.sub !== process.env.REACT_APP_DEFAULT_USERNAME) {
        this.setUsername(info.attributes.sub)
      }
    } catch (e) {
      console.error(e)
    }
  }

  userHasAuthenticated = authenticated => {
    this.setState({isAuthenticated: authenticated})
  }

  userIsAuthenticating = authenticating => {
    this.setState({isAuthenticating: authenticating})
  }

  setUsername = (username) => {
    this.setState({username: username})
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      isAuthenticating: this.state.isAuthenticating,
      userHasAuthenticated: this.userHasAuthenticated,
      setUsername: this.setUsername
    }
    return (
      <ThemeProvider theme={theme}>
        <RootContainer>
          <Header
            username={this.state.username}
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