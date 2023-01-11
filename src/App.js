/* 
import './App.css';
import Login from './pages/Login/login';


function App() {
  return (
    <div className="App">
      <Login></Login>
    </div>
  );
}

export default App; */

import React from 'react';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import Login from './pages/Login/login.js';
import Home from './pages/Home/home.js';
import Register from './pages/Register/Register.js';

function App() {
  return(

      <Router>
        <Switch>

          <Route path="/" exact render={(props) => <Login {...props} />} />
          <Route path="/home" exact render={(props) => <Home {...props} />} />
          <Route path="/register" exact render={(props) => <Register {...props} />} />

        </Switch>
      </Router>
  );
}
export default App;