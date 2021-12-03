import {
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Typography,
  Box,
  Modal
  } from "@material-ui/core";
  import { withRouter } from 'react-router';
  import React from 'react';
  import "react-datetime/css/react-datetime.css";
  import Datetime from "react-datetime";
  import {Card} from 'react-bootstrap'
  import UpcomingBookingsListing from "../LoginCard/UpcomingBookingsListing";
  import axios from 'axios';
  

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height: "700px",
  width: "500px"
};

class FindFlights extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          open:false, 
          source:["USA","CAN","MEX","SIN"],
          destination:["USA","CAN","SIN"],
          seatcount:0,
          seatcost:0,
          flightname:"",
          destinationFlight:"617849c1e358fad9c3be87ac",
          sourceFlight:"617849c1e358fad9c3be87ab",
          dateTimeArrival:"",
          dateTimeDeparture:""
      };
      this.handleSubmitFlight=this.handleSubmitFlight.bind(this)
      this.handleOpen=this.handleOpen.bind(this)
      this.handleClose=this.handleClose.bind(this)
      this.handleArrivalDate=this.handleArrivalDate.bind(this)
      this.handleDepartureDate=this.handleDepartureDate.bind(this)
      this.handleSubmitSource=this.handleSubmitSource.bind(this)
      this.handleSubmitDestination=this.handleSubmitDestination.bind(this)
      this.flightName=this.flightName.bind(this)
      this.handleSeatCount=this.handleSeatCount.bind(this)
      this.handleSeatCost=this.handleSeatCost.bind(this)
      this.handleDepartureDate=this.handleDepartureDate.bind(this)
  }
  handleOpen = () => this.setState({open:true});
  handleClose = () => this.setState({open:false});

  componentDidMount() {
    //get source airports
    const headers ={
        'Authorization': 'Bearer '+ window.sessionStorage.getItem("accessToken"),
        'Content-Type': 'application/json'
    }
    axios.get(`http://ec2-18-116-115-128.us-east-2.compute.amazonaws.com/airports`,
    {headers})
      .then(res => {
        console.log(res.data)
        this.setState({ source:res.data});
      })
  };

  handleSubmitSource = event => {
      console.log(event.target.value)
      this.setState({sourceFlight:event.target.value});
  }

  handleSubmitDestination = event => {
    console.log(event.target.value)
    this.setState({destinationFlight:event.target.value});
}
  handleSubmitFlight = e => {
    e.preventDefault()
    console.log("Submitted form",e,this.state)

    const headers ={
        'Authorization': 'Bearer '+window.sessionStorage.getItem("accessToken"),
        'Content-Type': 'application/json'
    }

    axios.post(`http://ec2-18-116-115-128.us-east-2.compute.amazonaws.com/flight/create`,
        {
            flightNum:this.state.flightname,
            departureAirport:this.state.destinationFlight,
            arrivalAirport:this.state.sourceFlight,
            departureTime:this.state.dateTimeDeparture,
            arrivalTime:this.state.dateTimeArrival,
            seatCost: this.state.seatcost,
            totalSeats: this.state.seatcount,
            availSeats:  this.state.seatcount
        },
        {headers})
      .then(res => {
        this.setState({searchResults:res.data.flights},
            function() { console.log("setState completed", this.state)})
        console.log(this.searchResults)
      })
  this.handleClose()
}


handleArrivalDate = event => {
  console.log(event,event._d.toISOString())
  this.setState({dateTimeArrival:event._d.toISOString()});
  console.log(this.state.dateTimeArrival)
}

handleDepartureDate = event => {
  console.log(event,event._d.toISOString())
  this.setState({dateTimeDeparture:event._d.toISOString()});
  console.log(this.state.dateTimeDeparture)
}

handleSubmitDestination = event => {
  console.log(event.target.value)
  this.setState({destinationFlight:event.target.value});
}

flightName = event => {
  console.log(event.target.value)
  this.setState({flightname:event.target.value});
}

handleSeatCount = event => {
  console.log(event.target.value)
  this.setState({seatcount:event.target.value});
}
handleSeatCost = event => {
  console.log(event.target.value)
  this.setState({seatcost:event.target.value});
}

  render(){
  return (
    <div>
    <Button style={{"float": "right",
    "margin-top": "5%", "margin-right": "10%"}} onClick={this.handleOpen}>Add a Flight</Button>
      <Modal
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a Flight
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          
          <p><p></p></p>
          <form onSubmit={this.handleSubmitFlight}   >
                    Flight Name 
                    <input id="name" className="dropBox" onChange={this.flightName} ></input>

                    Arrival Time
                    <p><p></p></p>
                    <Datetime id="dateIdFormat" onChange={this.handleArrivalDate}/>
                    <p><p></p></p>

                    <p><p></p></p>
                    Departure Time
                    <Datetime id="dateIdFormat" onChange={this.handleDepartureDate}/>
                    <p><p></p></p>
                        
                    Source
                    <select name="source" id="source" className="dropBox" onChange={this.handleSubmitSource}>
                    {this.state.source.airports && this.state.source.airports.map(airport => (
                        <option value={airport.id}>{airport.code}</option>
                    ))}
                    </select>
    
                    Destination
                    <select name="source" id="source" className="dropBox" onChange={this.handleSubmitDestination}>
                    {this.state.source.airports && this.state.source.airports.map(airport => (
                        <option value={airport.id}>{airport.code}</option>
                    ))}
                    </select>

                    Seat Cost
                    <input id="seatcost" className="dropBox" onChange={this.handleSeatCost}></input>

                    Total Seats
                    <input id="totalseats" className="dropBox" onChange={this.handleSeatCount}></input>

                    <p><p></p></p>
                    <p><p></p></p>
                    <p><p></p></p>
                    <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="button-block"
                    >
                    Submit
                    </Button>
                </form>
            </Typography>
        </Box>
      </Modal>
    </div>)
}
}

export default FindFlights;
