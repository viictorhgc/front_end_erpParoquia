import React, { Component } from 'react';
import './App.css';
import Routes from './routes'
import Menu from './components/Menu'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Menu />
          <Routes />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
