import React, { Component } from 'react'
import Routes from "./Routes";
import { compose } from 'react-apollo'

import { Container } from 'bloomer'
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components'
import Header from './components/Header'
import { maxMedia, minMedia } from './styles/style-utils'

import * as Resolver from './GraphQL/Resolvers/index'

import Login from './components/Login'

const theme = {
  primary: '#52082d',
  info: '#331507',
  success: '#eaccb2',
  primaryShadow: 'rgba(82, 8, 45, 0.3)',
  infoShadow: 'rgba(51, 21, 7, 0.3)',
  successShadow: 'rgba(234, 204, 178, 0.3)'
}

const RootContainer = styled(Container)`
  ${minMedia.touch`padding-top: 5rem;`};
  ${maxMedia.touch`padding-top: 2.25rem;`};
  color: ${props => props.theme.info}!important;
`

class App extends Component {

  state = {
    busy: false,
    isAuthenticated: false
  }

  render() {
    const childProps = {
      offers: this.props.offers,
      categories: this.props.categories,
      news: this.props.news,
      products: this.props.products,
      fillings: this.props.fillings,
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    }
    return (
      <ThemeProvider theme={theme}>
        <RootContainer isFluid>
          <Header />
          <Login />
          <Routes childProps={childProps} />
        </RootContainer>
      </ThemeProvider>
    );
  }
}

export default compose(
  Resolver.listOffers,
  Resolver.listCategories,
  Resolver.listNews,
  Resolver.listProducts,
  Resolver.listFillings)(App)