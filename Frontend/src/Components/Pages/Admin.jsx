import React from "react";
import {
Button,
TextField,
Grid,
Paper,
AppBar,
Typography,
Toolbar,
Link,
} from "@material-ui/core";
import { withRouter } from 'react-router';
import EmployeeFlightListing from '../Employee/EmployeeFlightListing'
import FlightAddition from '../Employee/FlightAddition'

class Admin extends React.Component {
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
<div>
<AppBar position="static" alignitems="center" class="vistaraHeader">
<Toolbar>
<Grid container justify="center" wrap="wrap">
<Grid item>
<img src="vistaralogo.jpeg" style={{"height":"70px"}}></img>
</Grid>
</Grid>
</Toolbar>
</AppBar>
</div>
<EmployeeFlightListing></EmployeeFlightListing>
<FlightAddition></FlightAddition>
 
</>
);
}
}
export default withRouter(Admin)