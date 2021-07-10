import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import CreateDriver from './components/CreateDriver';
import ShowDriverList from './components/ShowDriverList';
import ShowDriverDetails from './components/ShowDriverDetails';
import UpdateDriverInfo from './components/UpdateDriverInfo';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={ShowDriverList} />
          <Route path='/create-driver' component={CreateDriver} />
          <Route path='/edit-driver/:id' component={UpdateDriverInfo} />
          <Route path='/show-driver/:id' component={ShowDriverDetails} />
        </div>
      </Router>
    );
  }
}

export default App;