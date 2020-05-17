



import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import firebase from 'firebase'

export class Header extends Component {



  handleLogout(event){
    firebase.auth().signOut();
  }
  render() {
    return (
      <div>
        <AppBar className="AppBar" position="static">
          <Toolbar className="">
            <Link to="/">
              <Typography variant="h6" className="AppBar-title">
                AirBnb Clone
            </Typography>
            </Link>

            <div className="ml-auto">

              <Link to="/create">
                <Button >Create</Button>
              </Link>

              <Link to="/list">
                <Button >List</Button>
              </Link>

              {firebase.auth().currentUser == null ?
                <Link to="/login">
                  <Fab className="AppBar-Login" variant="extended">
                    Login
                  </Fab>
                </Link>

                :
                <Fab className="AppBar-Login" variant="extended" onClick={this.handleLogout}>
                  Logout
                </Fab>
              }

            </div>

          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default Header

