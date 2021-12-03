import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { render } from '@testing-library/react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class UpcomingBookings extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();

    const headers ={
      'Authorization': 'Bearer '+ window.sessionStorage.getItem("accessToken"),
      'Content-Type': 'application/json'
  }

  axios.post(`http://ec2-18-116-115-128.us-east-2.compute.amazonaws.com/flight/available`,
      {    
      seatCount:1,
      flight:this.props.id,
      user:window.sessionStorage.getItem("userId")
      },
      {headers})
    .then(res => {
      console.log("APIIIIII Response")
      this.setState({searchResults:res.data},
      function() { console.log("setState completed", this.state)})
      console.log(this.searchResults)
    })

    this.props.history.push({
      pathname: '/bookingCard',
      state: {
        data: this.props.id,
        departureAirport: this.props.departureAirport,
        arrivalAirport: this.props.arrivalAirport
      },
    })
  }

  render(){       
  return (
    <Card sx={{ "height":"200px","width": "700px", "box-shadow": "rgb(0 0 0 / 35%) 0px 5px 15px"}} className="UpcommingBookings">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div"style={{"margin-top":"-100px"}}>
            {this.props.departureAirport} to {this.props.arrivalAirport}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{"padding-left":"30px"}}>
            <div>From : {this.props.departureAirport}</div>
            <div>To   : {this.props.arrivalAirport}</div> 
            <div>Cost : $650</div>
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={this.handleSubmit}>
          SELECT
        </Button>
      </CardActions>
    </Card>
  );
}
}
export default withRouter(UpcomingBookings);