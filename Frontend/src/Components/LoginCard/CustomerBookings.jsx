import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { render } from '@testing-library/react';
import { withRouter } from 'react-router-dom';

class CustomerBookings extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push('/bookingCard')
  }

  render(){       
  return (
    <Card sx={{ "height":"200px","width": "700px","margin-top":"-20px"}} className="UpcommingBookings">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div"style={{"margin-top":"-50px"}}>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <div>PNR : {this.props.id}</div>
            <div>From : {this.props.departureAirport}</div>
            <div>To   : {this.props.arrivalAirport}</div> 
            <div>Cost : $650</div>
          </Typography>
        </CardContent>
    </Card>
  );
}
}
export default withRouter(CustomerBookings);