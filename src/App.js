import React, {Component} from 'react'
import Routes from "./Routes";
import {compose} from 'react-apollo'

import {Container} from 'bloomer'
import Header from './components/Header'
import {ThemeProvider} from 'styled-components'
import styled from 'styled-components'
import {media} from './styles/style-utils'

import * as Resolver from './GraphQL/Resolvers/index'

const theme = {
  primary: '#52082d',
  info: '#331507',
  success: '#eaccb2',
  primaryShadow: 'rgba(82, 8, 45, 0.3)',
  infoShadow: 'rgba(51, 21, 7, 0.3)',
  successShadow: 'rgba(234, 204, 178, 0.3)'
}

const RootContainer = styled(Container)`
  ${media.default `padding-top: 6rem;`};
  ${media.touch `padding-top: 4.25rem;`};
  color: ${props => props.theme.info}!important;
`

class App extends Component {

  state = {
    busy: false
  }

  render() {
    const childProps = {
      offers: this.props.offers,
      categories: this.props.categories,
      news: this.props.news
    }
    return (
      <ThemeProvider theme={theme}>
        <RootContainer isFluid>
          <Header/>
          <Routes childProps={childProps}/>
        </RootContainer>
      </ThemeProvider>
    );
  }
}

export default compose(Resolver.listOffers, Resolver.listCategories, Resolver.listNews, Resolver.listProducts)(App)
