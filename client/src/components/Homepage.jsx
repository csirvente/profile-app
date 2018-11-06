import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/signup">signup</Link>
        <Link to="/login">login</Link>
      </div>
    );
  }
}

export default HomePage;
