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

class CreateCustomerAccount extends React.Component {
constructor(props) {
super(props);
this.state = { fname:"", lname:"",emailempty: "sss@gmail.com",passwordempty:"sss",username: "",authflag:1 };
this.handleSubmit = this.handleSubmit.bind(this);
}

handleSubmit(event) {
event.preventDefault();
//axios call to hit backend and get authorization of the email id
//set in session storage
console.log(this.state)

axios.post(`http://ec2-18-116-115-128.us-east-2.compute.amazonaws.com/user/create`,
  {
  name:this.state.fname,
  email:this.state.emailempty,
  password:this.state.passwordempty
  },
)
.then(res => {
  console.log("APIIIIII Response")
  this.setState({user:res.data},function() { console.log("setState completed", this.state)})
})

alert('Customer created successfully! Try logging in !');
}


render() {
return (
<>
<Grid item>
<form onSubmit={this.handleSubmit}>
<Grid container direction="column" spacing={2}>
<Grid item>
<TextField
type="text"
placeholder="Name"
fullWidth
name="fname"
variant="outlined"
value={this.state.fname}
onChange={(event) =>
this.setState({
[event.target.name]: event.target.value,
})
}
required
/>
</Grid>

<Grid item>
<TextField
type="email"
placeholder="Email"
fullWidth
name="emailempty"
variant="outlined"
value={this.state.emailempty}
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
name="passwordempty"
variant="outlined"
value={this.state.passwordempty}
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
</Grid>
</>
);
}
}
export default withRouter(CreateCustomerAccount)