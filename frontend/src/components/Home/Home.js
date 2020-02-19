import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'whatwg-fetch';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <>
            <h3>Welcome to the airbnb simcoder's clone tutorial!</h3>            
      </>
    );
  }
}

export default Home;
