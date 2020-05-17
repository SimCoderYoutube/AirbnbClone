
import React, { Component } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


import Home from "./components/Home/Home";
import Create from "./components/Post/Create";
import List from "./components/Post/List";
import Post from "./components/Post/Post";
import Login from "./components/Login/Login";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import firebase from 'firebase';
import axios from 'axios'

export class App extends Component {

  componentDidMount() {
    let that = this
    firebase.auth().onAuthStateChanged(user => {

      if (user != null) {
        user.getIdToken(true).then(function (idToken) {
          axios.post('http://127.0.0.1:6200/api/user/check', null, { params: { user, idToken } })
            .then(res => {
              console.log(res)
              that.forceUpdate()
            })
            .catch(error => {
              that.forceUpdate()
              console.log(error)
            })
        }).catch((error) => {
          that.forceUpdate()
          console.log(error)
        })
      }



    })
  }
  render() {
    return (
      <>
        <Router>
          <Header />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/list" component={List} />
          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/" component={Home} />
        </Router>
        <Footer />
      </>
    )
  }
}

export default App
