import React from 'react';
import './App.css';
import Navbar from '../src/components/navbar'
import {Switch, Route} from 'react-router-dom'
import Products from '../src/containers/products'
import Edit from '../src/containers/edit'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div className="App">
      <Navbar/>
      <div className="bodies">
        <ToastContainer/>
        <Switch>
          <Route path="/:id"><Edit/></Route>
          <Route path="/"><Products /></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
