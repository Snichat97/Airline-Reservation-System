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
} from "@material-ui/core";
import { withRouter } from 'react-router';
import axios from 'axios';
import CreateCustomerAccount from './CreateCustomerAccount';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Logincard extends React.Component {
constructor(props) {
super(props);
this.state = { username: "", 
password:"", 
authflag:1,
flag:false,
user:{} };
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
this.onCreateAccount=this.onCreateAccount.bind(this);
this.onLogin=this.onLogin.bind(this);
}

handleChange(event) {
this.setState({ username: event.state.username, password: event.state.password});
}

onCreateAccount(event){
this.setState({ flag:true});
}

onLogin(event){
  this.setState({ flag:false});
  }

handleSubmit(event) {
event.preventDefault();
//axios call to hit backend and get authorization of the email id
//set in session storage

const headers ={
  'Authorization': 'Bearer ',
  'Content-Type': 'application/json'
}

axios.post(`http://ec2-18-116-115-128.us-east-2.compute.amazonaws.com/user/authenticate`,
  {
  email:this.state.username,
  password:this.state.password
  },
  {headers})
.then(res => {
  console.log("APIIIIII Response"+JSON.stringify(res))
  this.setState({user:res.data},
    function() {
      window.sessionStorage.setItem("accessToken", this.state.user.jwt);
      window.sessionStorage.setItem("userId", this.state.user.user);
      console.log("setState completed", this.state)})
  if(res.status==200){
    this.props.history.push('/customerLogin')
  }
  else {
    alert('Incorrect Credntials!');
    }

})
}


render() {
return (
<div>
<AppBar position="static" alignitems="center" class="vistaraHeader">
<Toolbar>
<Grid container justify="center" wrap="wrap">
<Grid item>
<img src="vistaralogo.jpeg" style={{"height":"70px"}}></img>
</Grid>
</Grid>
</Toolbar>
</AppBar>

<div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="carouselImage d-block w-100" src="carousel1.jpeg" alt="First slide" style={{"height":"720px"}}></img>
    </div>
    <div class="carousel-item">
      <img class="carouselImage d-block w-100" src="carousel2.jpeg" alt="Second slide"></img>
    </div>
    <div class="carousel-item">
      <img class="carouselImage d-block w-100" src="carousel3.jpeg" alt="Third slide"></img>
    </div>
  </div>
</div>


<Grid container justify="center" direction="row" style={{marginTop:"-40rem",position:"absolute",marginLeft:"25rem",
  "opacity": 0.8}}>
<Grid item>
<Grid
container
direction="column"
justify="center"
spacing={2}
className="login-form"
>
<Paper
variant="elevation"
elevation={2}
className="login-background tablinks"
>

<Grid item>
{this.state.flag==false && (<>
<form onSubmit={this.handleSubmit}>
<Grid container direction="column" spacing={2}>

<Grid item>
<TextField
type="email"
placeholder="Email"
fullWidth
name="username"
variant="outlined"
value={this.state.username}
onChange={(event) =>
this.setState({
[event.target.name]: event.target.value,
})
}
required
autoFocus
/>
</Grid>
<Grid item>
<TextField
type="password"
placeholder="Password"
fullWidth
name="password"
variant="outlined"
value={this.state.password}
onChange={(event) =>
this.setState({
[event.target.name]: event.target.value,
})
}
required
/>
</Grid>
<Grid item>
<Button
variant="contained"
color="primary"
type="submit"
className="button-block"
>
Submit
</Button>
</Grid>
</Grid>
</form>
<Grid item>
<Link onClick={this.onCreateAccount} variant="body2">
New here .....Create Account 
</Link>
</Grid>
</>)}

{this.state.flag && (<><CreateCustomerAccount></CreateCustomerAccount>
  <Grid item>
<Link onClick={this.onLogin} variant="body2">
Have an Account? Login from here
</Link>
</Grid></>)}

</Grid>
</Paper>
</Grid>
</Grid>
</Grid>
 
</div>
);
}
}
export default withRouter(Logincard)