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
searchResults:{},
reservation:{},
count:1,
flag:false };
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
this.incrementCount = this.incrementCount.bind(this);
this.decrementCount = this.decrementCount.bind(this);
this.checkAvailability = this.checkAvailability.bind(this);
this.confirmReservation = this.confirmReservation.bind(this);

}

componentDidMount(){

  const headers ={
    'Authorization': 'Bearer '+ window.sessionStorage.getItem("accessToken"),
    'Content-Type': 'application/json'
}

  axios.post(`http://ec2-18-116-115-128.us-east-2.compute.amazonaws.com/flight/available`,
      {    
      seatCount:1,
      flight:"61a82a1d37a53235579a44ff",
      user:window.sessionStorage.getItem("userId")
      },
      {headers})
    .then(res => {
      this.setState({ searchResults:res.data},
        function() { this.setState({flag:true});
    console.log(this.searchResults)
    })
      })
}

checkAvailability(event) {
  console.log("trigggeringg the check availability function!! whatch out."+" "+JSON.stringify(this.props.history.location)+" "+JSON.stringify(this.props.history.location.state)+this.props.history.location.state.data+this.props.history.location.state?.data)

      const headers ={
        'Authorization': 'Bearer '+ window.sessionStorage.getItem("accessToken"),
        'Content-Type': 'application/json'
    }

    axios.post(`http://ec2-18-116-115-128.us-east-2.compute.amazonaws.com/flight/available`,
        {    
        seatCount:this.state.count,
        flight:this.props.history.location.state.data,
        user:window.sessionStorage.getItem("userId")
        },
        {headers})
      .then(res => {
        console.log("APIIIIII Response")
        this.setState({searchResults:res.data},
          function() { this.setState({flag:true});
        console.log(this.searchResults)})
      })

  }

confirmReservation(event) {
    const vari =this.props.history.location.state.data;
    console.log("trigggeringg the confirm reservation function!! whatch out. ",vari)
    this.props.history.push('/customerDashboard')

    const headers ={
      'Authorization': 'Bearer '+ window.sessionStorage.getItem("accessToken"),
      'Content-Type': 'application/json'
  }

  axios.post(`http://ec2-18-116-115-128.us-east-2.compute.amazonaws.com/reservation/create`,
      {    
      seats:this.state.count,
      flight:vari,
      user:window.sessionStorage.getItem("userId")
      },
      {headers})
    .then(res => {
      console.log("APIIIIII Response")
      this.setState({reservation:res.data},
      console.log(this.searchResults))
    })

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

<Container style={{ "margin-left": "200px"}}>
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
    "padding-top": "30px",
    "width": "300px", 
    "margin-top": "-50px",
    "background": "whitesmoke"
    }}>
    <Typography variant="h5" component="div">
       <center> Flight Details</center>
      </Typography>

      <br></br>
      <br></br>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Source
      </Typography>
      <Typography variant="h5" component="div">
       {this.props.history.location.state.departureAirport}
      </Typography>
      

      <br></br>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Destination
      </Typography>
      <Typography variant="h5" component="div">
        {this.props.history.location.state.arrivalAirport}
      </Typography>
      
      
      <br></br>
      <center>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Seats 
      </Typography>

      Count: { this.state.count }
      <Button onClick = { () => this.incrementCount() }>Increase</Button>
      <Button onClick = { () => this.decrementCount() }>Decrease</Button>

      <Button onClick={this.checkAvailability}>Check Availability</Button>
      </center>
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
  {this.state.flag && (<React.Fragment style={{
    "height":"500 px"}}>
    <CardContent style={{
    "height":"500 px",
    "margin-top": "-95px",
    "padding-top": "30px",
    "width": "300px",
    "background": "whitesmoke"}}>
    <Typography variant="h5" component="div">
       <center>Mileage Rewards</center>
      </Typography>

      <br></br>
      <br></br>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Your Mileage Points
      </Typography>
      <Typography variant="h5" component="div">
        {this.state.searchResults.mileagePts}
      </Typography>
      
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Mileage you will Earn at this purchase
      </Typography>
      <Typography variant="h5" component="div"> 
      {this.state.searchResults.totalCost*.1}
      </Typography>

      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
       Restultant cost
      </Typography>
      <Typography variant="h5" component="div">
      {this.state.searchResults.totalCost-this.state.searchResults.mileagePts}
      </Typography>

      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Cost of Each Seat
      </Typography>
      <Typography variant="h5" component="div">
      {this.state.searchResults.totalCost/this.state.count} 
      </Typography>

      ------ You Save ! -------- 
      {this.state.searchResults.mileagePts}

    </CardContent>
  </React.Fragment>)}
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