import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Admin from './Components/Pages/Admin';
import Customer from './Components/Pages/Customer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Bookingcard from './Components/BookingPage/Bookingcard';
import CustomerAccountDashboard from './Components/CustomerAccountPage/CustomerAccountDashboard';

ReactDOM.render((
  <Router>
       <Route path = "/home" component = {App}/>
       <Route path = "/adminLogin" component = {Admin} />
       <Route path = "/customerLogin" component = {Customer} />
       <Route path = "/bookingCard" component = {Bookingcard} />
       <Route path = "/customerDashboard" component = {CustomerAccountDashboard} />
 </Router>)
,document.getElementById('root')
);