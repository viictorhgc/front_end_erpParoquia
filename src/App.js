import React, { Component } from 'react';
import './App.css';
import Routes from './routes'
import Menu from './components/Menu'
import Rodape from './components/Rodape'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { Container } from 'react-bootstrap';
class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Menu />
          <Container className='body-content'>
            <Routes />
          </Container>     
          <Rodape />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
