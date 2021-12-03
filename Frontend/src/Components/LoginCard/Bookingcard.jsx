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
import{Row,Col,Container} from 'react-bootstrap';

class Bookingcard extends React.Component {
constructor(props) {
super(props);
this.state = { username: "", 
password:"", 
authflag:1,
user:{},
count:1 };
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
this.incrementCount = this.incrementCount.bind(this);
this.decrementCount = this.decrementCount.bind(this);
this.checkAvailability = this.checkAvailability.bind(this);
this.confirmReservation = this.confirmReservation.bind(this);

}
checkAvailability(event) {
  console.log("trigggeringg the check availability function!! whatch out.")
  this.props.history.push('/customerDashboard')
  }

confirmReservation(event) {
    console.log("trigggeringg the confirm reservation function!! whatch out.")
    this.props.history.push('/customerDashboard')
}

incrementCount= () => {
  this.setState({
    count:this.state.count+1
  })
}

decrementCount= () => {
  if(this.state.count-1>0){
    this.setState({
      count:this.state.count-1
    })
  }
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
  'Authorization': 'Bearer '+ window.sessionStorage.getItem("accessToken"),
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
return (<><AppBar position="static" alignitems="center" class="vistaraHeader">
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
  <Col>
  <Grid style={{position:"absolute",
    marginLeft:"15 rem",
    "opacity": 0.8,
    width: "100%",
    "left-margin": "0 rem",
    "margin-left": "5 rem",
    "padding-top": "30px"
}}>
  <Card style={{
    "padding-top": "30px"}}
    >
  <React.Fragment>
    <CardContent style={{
    "padding-top": "30px","width": "300px", "margin-top": "-50px"
    }}>
    <Typography variant="h5" component="div">
        Flight Details
      </Typography>

      <br></br>
      <br></br>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Source
      </Typography>
      <Typography variant="h5" component="div">
        SJC
      </Typography>
      
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Destination
      </Typography>
      <Typography variant="h5" component="div">
        SFO
      </Typography>

      <Typography variant="h5" component="div">
        SFO to DEL | 4th Janurary 2021
      </Typography>

      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Number of Seats 
      </Typography>

      Count: { this.state.count }
      <Button onClick = { () => this.incrementCount() }>Up</Button>
      <Button onClick = { () => this.decrementCount() }>Down</Button>

      <Button onClick={this.checkAvailability}>Check Availability</Button>

    </CardContent>
  </React.Fragment>
  </Card>
  </Grid>
  </Col>
  <Col>
  <Grid item style={{position:"absolute",
    marginLeft:"15 rem",
    "opacity": 0.8,
    width: "100%",
    "left-margin": "20 rem",
    "margin-left": "5 rem",
    "padding-top": "30px"
}}>
  <Card  style={{
    "height":"500 px"}}
  >
  <React.Fragment style={{
    "height":"500 px"}}>
    <CardContent style={{
    "height":"500 px","margin-top": "-95px"}}>
    <Typography variant="h5" component="div">
        Mileage Rewards
      </Typography>

      <br></br>
      <br></br>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Your Mileage Points
      </Typography>
      <Typography variant="h5" component="div">
        390293
      </Typography>
      
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Mileage you will Earn at this purchase
      </Typography>
      <Typography variant="h5" component="div">
        13350
      </Typography>

      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
       Restultant cost
      </Typography>
      <Typography variant="h5" component="div">
        $100
      </Typography>

    </CardContent>
  </React.Fragment>
  </Card>
  </Grid>
  </Col>
  </Row>
  </Container>

  <Button style={{"float": "right",
    "margin-top": "40%", "margin-right": "10%"}} onClick={this.confirmReservation}>Confirm Reservation</Button>
  </>
);
}
}
export default withRouter(Bookingcard)