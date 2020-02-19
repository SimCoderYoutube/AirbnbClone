import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


import Home from "./components/Home/Home";
import Create from "./components/Post/Create";
import Login from "./components/Login/Login";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/" component={Home} />
      </Router>
      <Footer />
    </>
  );
}
export default App;
