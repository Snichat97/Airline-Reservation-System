import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import CustomerBookings from './CustomerBookings';

class CustomerBookingsListing extends React.Component{
  constructor(props){
    super(props);
  }
  render() {
    const searchResults = JSON.parse(this.props.searchResults);
    return (
    <>
    {/* {searchResults && (
      <ul>
      <h1>Flights from {searchResults}</h1>
        {searchResults.map(flight => (
          <div><CustomerBookings id={flight.code} departureAirport={flight.arrivalAirport.code} arrivalAirport={flight.departureAirport.code}></CustomerBookings></div>
        ))}
      </ul>)} */}
    </>);
  };
}
  export default CustomerBookingsListing;