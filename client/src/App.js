import React from 'react';
import './App.css';
import Navbar from '../src/components/navbar'
import {Switch, Route} from 'react-router-dom'
import Products from '../src/containers/products'


function App() {

  return (
    <div className="App">
      <Navbar/>
      <div className="bodies">
        <Switch>
          <Route path="/edit"/>
          <Route path="/"><Products /></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
