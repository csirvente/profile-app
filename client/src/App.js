import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import HomePage from './components/Homepage';
import Signup from './components/Signup';
import Login from './components/Login';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  constructor(props) {
      super(props)
      this.state = {user: {}, isLoggedIn: false }
      this.fetchUser()
  }

  logout () {
    axios.get("http://localhost:5000/auth/logout")
    .then((response) => {
      this.setState({user: null, isLoggedIn: false})
    })
  }
  fetchUser() {
    axios.get("http://localhost:5000/auth/loggedin")
    .then((response) => {
      if (response.data.user)
        this.setState({user: response.data.user, isLoggedIn: true})
      else
        this.setState({user: null, isLoggedIn: false})
    })
  }
  logUser (user) {
    console.log('logging user', user)
    this.setState({user, isLoggedIn: true})
  }
  render() {
    if(this.state.isLoggedIn) {
      return (
        <div className="App">
          <h4>{this.state.user.username}</h4>
          <img src={this.state.user.image}/>
          <button onClick={this.logout.bind(this)}>Logout</button> 
          <Switch>
            <Route path="/" component={HomePage}/>
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Switch>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/login" render={(props) => <Login logUser={this.logUser.bind(this)}></Login>}/>
            <Route path="/" component={HomePage}/>
          </Switch>
        </div>
      );
    }
  }
}

export default App;
