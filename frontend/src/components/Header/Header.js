import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <Link to="/">Home</Link>

    <nav>
      <Link to="/login">Login</Link>
      <Link to="/create">Create</Link>
      <Link to="/list">List</Link>
    </nav>

    <hr />
  </header>
);

export default Header;
