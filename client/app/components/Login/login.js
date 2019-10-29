import React, { Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseUi from 'react-firebaseui/StyledFirebaseAuth'
import 'whatwg-fetch';
import axios from 'axios'

const firebaseConfig = {
  apiKey: "AIzaSyDAioB8pnLluiIHXHhos-JdHftypH6UYKI",
  authDomain: "airbnbclone-88e95.firebaseapp.com",
  databaseURL: "https://airbnbclone-88e95.firebaseio.com",
  projectId: "airbnbclone-88e95",
  storageBucket: "airbnbclone-88e95.appspot.com",
  messagingSenderId: "273254247195",
  appId: "1:273254247195:web:26f1bfe40c110607b6c1be",
  measurementId: "G-WEWECNQ9EB"
};

firebase.initializeApp(firebaseConfig)

var uiConfig = {
  callbacks: {
    //After user signs in this function is called
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      axios.post('/api/user/check', null, { params: { user: firebase.auth().currentUser } })
        .then(res => {
          console.log(res)
        })
      return true;
    }
  },
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
};


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false
    }
  }

  componentDidMount() {
    //Auth State Listener, called any time the user logs in or out
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isAuthenticated: !this.state.isAuthenticated })
    })
  }

  render() {
    return (
      <>
        <h3>Login</h3>
        <StyledFirebaseUi
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />

      </>
    );
  }
}

export default Login;
