import React, {Component} from 'react'
import Routes from "./Routes";
import {Container} from 'bloomer'
import Header from './components/Header'

class App extends Component {
  render() {
    return (
      <Container isFluid>
        <Header />
        <Routes />
      </Container>
    );
  }
}

export default App
