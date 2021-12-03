import {
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    RadioGroup,
    Radio,
    FormLabel,
    FormControlLabel,
    Button,
    Typography
    } from "@material-ui/core";
    import { withRouter } from 'react-router';
    import React from 'react';
    import "react-datetime/css/react-datetime.css";
    import Datetime from "react-datetime";
    import {Card} from 'react-bootstrap'
    import UpcomingBookingsListing from "../LoginCard/UpcomingBookingsListing";
    import axios from 'axios';
    
    
    class FindFlights extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", 
            password:"", 
            authflag:1,
            source:["USA","CAN","MEX","SIN"],
            destination:["USA","CAN","SIN"],
            dateTime:"",
            destinationFlight:"",
            sourceFlight:"",
            searchResults:[]
        }
        ;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitDate =this.handleSubmitDate.bind(this);
        this.handleSubmitSource=this.handleSubmitSource.bind(this);
        this.handleSubmitDestination=this.handleSubmitDestination.bind(this)
    }

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
    
    handleChange(event) {
        this.setState({ username: event.state.username, password: event.state.password });
    }
    
    handleSubmit(event) {
        event.preventDefault();

        const headers ={
            'Authorization': 'Bearer '+ window.sessionStorage.getItem("accessToken"),
            'Content-Type': 'application/json'
        }
    
        axios.post(`http://ec2-18-116-115-128.us-east-2.compute.amazonaws.com/flight/search`,
            {
            email:"SJC",
            password:"SFO"
            },
            {headers})
          .then(res => {
            console.log("APIIIIII Response")
            this.setState({searchResults:res.data},
            function() { console.log("setState completed", this.state)})
            console.log(this.searchResults)
          })

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

    handleSubmitFlight = e => {
        e.preventDefault()
        console.log("Submitted form",this.state.dateTime,this.state.sourceFlight,this.state.destinationFlight)

        const headers ={
            'Authorization': 'Bearer '+window.sessionStorage.getItem("accessToken"),
            'Content-Type': 'application/json'
        }
    
        axios.post(`http://ec2-18-116-115-128.us-east-2.compute.amazonaws.com/flight/search`,
            {
                departureAirport:this.state.sourceFlight,
                arrivalAirport:this.state.destinationFlight,
                departureDate:this.state.dateTime
            },
            {headers})
          .then(res => {
            console.log("APIIIIII Response")
            this.setState({searchResults:res.data.flights},
                function() { console.log("setState completed", this.state)})
            console.log(this.searchResults)
          })
    }

    handleSubmitDate = event => {
        console.log(event,event._d.toISOString())
        this.setState({dateTime:event._d.toISOString()});
        console.log(this.state.dateTime)
    }

    handleSubmitSource = event => {
        console.log(event.target.value)
        this.setState({sourceFlight:event.target.value});
    }

    handleSubmitDestination = event => {
        console.log(event.target.value)
        this.setState({destinationFlight:event.target.value});
    }
    
    render() {
    return (
        <>
            <Card className="dateCard" style={{"opacity": 0.8,marginLeft:"40rem"}}>
                
                <Typography variant="h5" component="div"  style={{"marginTop":"-50px"}} >
                <center> Flight Schedule</center>
                </Typography>

                <form onSubmit={this.handleSubmitFlight} style={{"marginLeft":"90px"}}>
                    <br></br>
                    <p><p>
                    Travel Date
                    <Datetime id="dateIdFormat" style={{"marginTop":"700px","width":"50%"}} class="input-group-text"  timeFormat={false} onChange={this.handleSubmitDate}/>
                    <p><p>

                    <br></br>
                    Source
                    <select name="source" id="source"  className="dropBox form-select"  style={{"width":"80%","height":"40px","border-radius":"10px"}} onChange={this.handleSubmitSource}>
                    {this.state.source.airports && this.state.source.airports.map(airport => (
                        <option value={airport.id}>{airport.code}</option>
                    ))}
                    </select>

                    <br></br>
                    Destination
                    <select name="destination" id="destination" className="dropBox" style={{"width":"80%","height":"40px","border-radius":"10px"}} onChange={this.handleSubmitDestination}>
                    {this.state.source.airports && this.state.source.airports.map(airport => (
                        <option value={airport.id}>{airport.code}</option>
                    ))}
                    </select>

                    <br></br>
                    <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="button-block"
                    style={{"width":"80%"}} 
                    >
                    Submit
                    </Button>
                
                </p></p>
                </p></p>
                </form>
            </Card>
            <div>{ this.state.searchResults &&
            (<><div  style={{"marginTop":"700px","margin-left":"400px"}}><UpcomingBookingsListing searchResults={this.state.searchResults} fromAirportFixed={this.state.sourceFlight}>
                </UpcomingBookingsListing></div></>)}</div>
            </>
    );
    }
    }
    export default FindFlights;