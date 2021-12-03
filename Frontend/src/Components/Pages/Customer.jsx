import {
Button,
TextField,
Grid,
Paper,
AppBar,
Typography,
Toolbar,
Link,
FormControl,
InputLabel,
Input,
FormHelperText
} from "@material-ui/core";
import { withRouter } from 'react-router';
import React from 'react';
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import {Card} from 'react-bootstrap'
import UpcomingBookingsListing from "../LoginCard/UpcomingBookingsListing";
import FindFlights from "../LoginCard/FindFlights";
import CustomerDetails from "./CustomerDetails"

class Customer extends React.Component {
constructor(props) {
super(props);
this.state = { username: "", password:"", authflag:1 };
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event) {
this.setState({ username: event.state.username, password: event.state.password });
}

handleSubmit(event) {
event.preventDefault();
//axios call to hit backend and get authorization of the email id
if (this.state.username === 'customer@gmail.com' && this.state.password === 'customer') {
    alert('Customer');
} 
else if(this.state.username === 'admin@gmail.com' && this.state.password === 'admin'){
    alert('Admin');
}
else {
alert('Incorrect Credntials!');
}
}

render() {
return (
    <>
    <AppBar position="static" alignitems="center" class="vistaraHeader">
            <Toolbar>
                <Grid container justify="center" wrap="wrap">
                    <Grid item>
                        <img src="vistaralogo.jpeg" style={{ "height": "70px" }}></img>
                        <div>Points : XXXXXXX</div>
                        <div>My Profile</div>
                    </Grid>
                </Grid>
                <a href={CustomerDetails}>Details</a>
            </Toolbar>
        </AppBar>
        <img class="carouselImage d-block w-100" src="carousel2.jpeg" alt="Second slide"style={{position:"absolute"}}></img>
        <FindFlights></FindFlights>
        </>
);
}
}
export default withRouter(Customer);