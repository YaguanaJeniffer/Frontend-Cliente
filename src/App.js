import React from 'react';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import Login from './pages/Login/login.js';
import Home from './pages/Home/home.js';
import Register from './pages/Register/Register.js';
import MenuVenta from './pages/Home/components/MenuVenta.js';
import VentaTicket from './pages/Home/components/componentesCompra/VentaTicket.jsx';
import Ticket from './pages/Home/components/componentesCompra/ticket.jsx';


function App() {
  return(

      <Router>
        <Switch>

          <Route path="/" exact render={(props) => <Login {...props} />} />
          <Route path="/home" exact render={(props) => <Home {...props} />} />
          <Route path="/register" exact render={(props) => <Register {...props} />} />
          <Route path="/venta"  exact render={(props) => <MenuVenta {...props} />} />
          <Route path="/venta/ticket" exact render={(props) => <VentaTicket {...props}  component={() => <Ticket history={this.props.history} />}/>} />
          <Route path="/ticket" exact render={(props) => <Ticket {...props} location={this.props.location}  component={() => <Ticket history={this.props.history} />}/>} />
          
        </Switch>
      </Router>
  );
}
export default App;