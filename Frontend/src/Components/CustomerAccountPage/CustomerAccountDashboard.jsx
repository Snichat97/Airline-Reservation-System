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
CardContent,
Card
} from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import{Row,Col,Container,Modal} from 'react-bootstrap';
import CustomerDetails from '../Pages/CustomerDetails';
import CustomerBookingsListing from '../LoginCard/CustomerBookingsListing';
import CustomerBookings from '../LoginCard/CustomerBookings';


class CustomerAccountDashboard extends React.Component {
constructor(props) {
super(props);
this.state = { username: "", 
password:"", 
authflag:1,
user:{},
past:[],
upcoming:[],
searchResults:{},
flag:false,
flagUpcoming:false
};
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
}

componentDidMount(){

  const headers ={
    'Authorization': 'Bearer '+ window.sessionStorage.getItem("accessToken"),
    'Content-Type': 'application/json'
}

axios.post(`http://ec2-18-116-115-128.us-east-2.compute.amazonaws.com/reservation/past`,
    {    
    user:window.sessionStorage.getItem("userId")
    },
    {headers})
  .then(res => {
    this.setState({past:res.data.reservations},
      function() { this.setState({flag:true});
  console.log(this.searchResults)
  })
})

axios.post(`http://ec2-18-116-115-128.us-east-2.compute.amazonaws.com/reservation/upcoming`,
    {    
    user:window.sessionStorage.getItem("userId")
    },
    {headers})
  .then(res => {
    console.log(res.data.reservations);
    this.setState({upcoming:res.data.reservations},
      function() { this.setState({flagUpcoming:true});
  console.log(this.searchResults)
  })
})
}

handleChange(event) {
this.setState({ username: event.state.username, password: event.state.password });
}

// setToken(JWT){
//   window.localStorage.setItem(token, JWT);
// }

handleSubmit(event) {
event.preventDefault();
//axios call to hit backend and get authorization of the email id
//set in session storage

const headers ={
  'Authorization': 'Bearer '+window.sessionStorage.getItem("accessToken"),
  'Content-Type': 'application/json'
}

axios.post(`http://ec2-18-116-115-128.us-east-2.compute.amazonaws.com/user/authenticate`,
  {
  email:this.state.username,
  password:this.state.password
  },
  {headers})
.then(res => {
  console.log("APIIIIII Response")
  this.setState({user:res.data},function() { console.log("setState completed", this.state)})
})

if (this.state.user.password ==='customer') {
    this.props.history.push('/customerLogin')
    
} 
else if(this.state.user.password==='admin'){
    this.props.history.push('/adminLogin')
}
else {
alert('Incorrect Credntials!');
}
}


render() {
return (this.state.past!=[] &&(<><AppBar position="static" alignitems="center" class="vistaraHeader">
<Toolbar>
    <Grid container justify="center" wrap="wrap">
        <Grid item>
            <img src="vistaralogo.jpeg" style={{ "height": "70px" }}></img>
        </Grid>
    </Grid>
</Toolbar>
</AppBar>
{/* <img class="carouselImage d-block w-100" src="carousel2.jpeg" alt="Second slide"></img> */}
<Container>
  <Row>
  <Col style={{marginTop:"45px"}}>
  <CustomerDetails ></CustomerDetails>
  </Col>
  <Col style={{marginTop:"45px"}}>

<div style={{marginBottom:"45px", fontSize:"1.5em"}}><strong>Upcoming Flights</strong></div>
{this.state.flagUpcoming && this.state.upcoming.map(flight => (
          <div><CustomerBookings id={flight.flight.flightNum} departureAirport={flight.flight.arrivalAirport.code} arrivalAirport={flight.flight.departureAirport.code}></CustomerBookings></div>
        ))}

<div style={{marginTop:"45px",marginBottom:"45px", fontSize:"1.5em"}}><strong>Past Flights</strong></div>
  {this.state.flag && this.state.past.map(flight => (
          <div><CustomerBookings id={flight.flight.flightNum} departureAirport={flight.flight.arrivalAirport.code} arrivalAirport={flight.flight.departureAirport.code}></CustomerBookings></div>
        ))}
  </Col>
  </Row>
  </Container>
  </>)
);
}
}
export default withRouter(CustomerAccountDashboard)