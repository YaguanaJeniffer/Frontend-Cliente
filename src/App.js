import React from 'react';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import Login from './pages/Login/login.js';
import Home from './pages/Home/home.js';
import Register from './pages/Register/Register.js';
import MenuVenta from './pages/Home/components/MenuVenta.js';


function App() {
  return(

      <Router>
        <Switch>

          <Route path="/" exact render={(props) => <Login {...props} />} />
          <Route path="/home" exact render={(props) => <Home {...props} />} />
          <Route path="/register" exact render={(props) => <Register {...props} />} />
          <Route path="/venta" exact render={(props) => <MenuVenta {...props} />} />

        </Switch>
      </Router>
  );
}
export default App;