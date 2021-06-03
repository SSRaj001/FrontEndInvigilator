import './App.css'
import React, { Component  } from "react"
import { Form, Button, Card } from "react-bootstrap"
import ReactSnackBar from "react-js-snackbar"

class Login extends Component {

  constructor(){
    super();
    this.state = {
      Show : false,
      Showing : false,
      Value : "Hello, there"
    };
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
  }
  

  show = () =>{
    if(this.state.showing) return;

    this.setState({Show:true, Showing:true, Value:this.emailRef.current.value});
    setTimeout(()=>{
      this.setState({Show:false, Showing:false, Value: ""});
    },2000)
  };

  onSubmitHandler = (e) =>{
    e.preventDefault()
    //console.log(this.emailRef.current && this.passwordRef.current)
    if(this.emailRef.current && this.passwordRef.current){
      this.setState({Value:this.emailRef.current})
      this.show()
    }
  };

  render(){
    return (
      <>
        <Card>
          <Card.Body>
            <h2 className="test-center mb-4"> Login </h2>
            <Form onSubmit={this.onSubmitHandler}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={this.emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={this.passwordRef} required />
              </Form.Group>
              <Button className="w-100" type="submit" > Login </Button>
            </Form>
          </Card.Body>
        </Card>
        <ReactSnackBar Show={this.state.Show}>
          {this.state.Value}
        </ReactSnackBar>
      </>
    );
  }
}

export default Login;
