import React, { Component } from 'react';
import './App.css';


class Login extends Component {
    constructor(props){
        super(props);
        this.state={
        username:'',
        password:'',
        valid:true
        };
        this.login= this.login.bind(this);
        this.handleChange= this.handleChange.bind(this);
    }  
    login (){
        if(this.state.username === "Luke Skywalker" && this.state.password === "19BBY"){
            this.props.history.push("/mainPage");
            this.setState({"valid":true});
           localStorage.setItem("status",true);  // localStorage being used to manage session
        }
        else{
            this.setState({valid:false});
        }
    }
    handleChange(name,event){        
        this.state[name]=event.target.value;
        this.setState(this.state);
    }
  render() {
    return (
      <div>
          <ul className='loginContainer'>
          <li><input name="username" type="text" onChange = {this.handleChange.bind(this,"username")} placeholder="username"/> </li>
          <li><input name="password" type="text" onChange = {this.handleChange.bind(this,"password")} placeholder="password"/> </li>
          <li><button  onClick={this.login}> login </button></li>
          </ul>
          {!(this.state.valid) && <p className="error">Invalid username and password</p>}
      </div>    
    );
  }
}

export default Login;
