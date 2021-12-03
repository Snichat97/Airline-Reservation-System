import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default class OutlinedCard extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
        profile:false,
    };
}

  componentDidMount() {
    //get source airports
    const headers ={
        'Authorization': 'Bearer '+ window.sessionStorage.getItem("accessToken"),
        'Content-Type': 'application/json'
    }

    axios.post(`http://ec2-18-116-115-128.us-east-2.compute.amazonaws.com/user/profile`,
        {
            id:window.sessionStorage.getItem("userId"),
        },
        {headers})
      .then(res => {
        this.setState({profile:res.data},
            function() { console.log("setState completed", this.state)})
        console.log(this.searchResults)
      })
  };

  render(){
  return (
    <Box sx={{ minWidth: "max-content" }}>
      <Card style={{"border-radius":"20px","box-shadow":"5px 5px grey","margin-top":"-10px" }} >
      <CardContent style={{"margin-top":"-50px"}}  >
    <Typography variant="h5" component="div">
        User Details
      </Typography>

      <br></br>
      <br></br>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Name
      </Typography>
      <Typography variant="h5" component="div">
        {this.state.profile.name}
      </Typography>
      
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Reward Miles
      </Typography>
      <Typography variant="h5" component="div">
        {this.state.profile.mileagePts}
      </Typography>

      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        User Id
      </Typography>
      <Typography variant="h7" component="div">
        {this.state.profile.id}
      </Typography>

    </CardContent>
      </Card>
    </Box>
  );
}
}
