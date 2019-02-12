import React, { Component } from 'react';
import WeekContainer from './WeekContainer.js'
import { Provider } from 'react-redux';
import { store } from './actions.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
	      <div className="App">
	        <WeekContainer />
	      </div>
	  </Provider>
    );
  }
}

export default App;
