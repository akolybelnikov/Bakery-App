import React, {Component} from 'react'
import Routes from "./Routes";
import {Container} from 'bloomer'
import Header from './components/Header'
import {ThemeProvider} from 'styled-components'

const theme = {
  primary: '#52082d',
  info: '#331507',
  success: '#eaccb2',
  primaryShadow: 'rgba(82, 8, 45, 0.3)',
  infoShadow: 'rgba(51, 21, 7, 0.3)',
  successShadow: 'rgba(234, 204, 178, 0.3)'
}

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container isFluid>
          <Header/>
          <Routes/>
        </Container>
      </ThemeProvider>
    );
  }
}

export default App
