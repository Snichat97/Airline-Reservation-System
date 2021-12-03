import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';


export default class EmployeeFlightListing extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
      allairports:[],
      flag:false,
    };
}


  componentDidMount() {
    //get source airports
    const headers ={
        'Authorization': 'Bearer '+ window.sessionStorage.getItem("accessToken"),
        'Content-Type': 'application/json'
    }
    axios.get(`http://ec2-18-116-115-128.us-east-2.compute.amazonaws.com/flight`,
    {headers})
      .then(res => {
        console.log(res.data.flights)
        this.setState({ allairports:res.data.flights},
          function() { this.setState({flag:true});
      console.log(this.searchResults)
      })
      })
  };

  render(){
  return (this.state.flag &&(<>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Flight Id</TableCell>
            <TableCell align="right">Departure Airport</TableCell>
            <TableCell align="right">Arrival Airport&nbsp;(g)</TableCell>
            <TableCell align="right">Available Seats</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.allairports && this.state.allairports.map((flight) => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {flight.flightNum}
              </TableCell>
              <TableCell align="right">{flight.arrivalAirport.code}</TableCell>
              <TableCell align="right">{flight.departureAirport.code}</TableCell>
              <TableCell align="right">{flight.availSeats}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table></>)
  );}
}
