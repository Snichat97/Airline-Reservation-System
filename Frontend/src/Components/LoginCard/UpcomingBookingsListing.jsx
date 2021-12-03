import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import UpcomingBookings from './UpcomingBookings';

class UpcomingBookingsListing extends React.Component{
  constructor(props){
    super(props);
    console.log("jdmsifjmijdms")
  }
  render() {
    return (
    <>
    {this.props && this.props.searchResults && (
      <ul>
        {this.props.searchResults.map(flight => (
          <div><UpcomingBookings id={flight.id} departureAirport={flight.departureAirport.code} arrivalAirport={flight.arrivalAirport.code}></UpcomingBookings></div>
        ))}
      </ul>)}
    </>);
  };
}
  export default UpcomingBookingsListing;