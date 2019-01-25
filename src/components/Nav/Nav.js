import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import LogOutButton from '../LogOutButton/LogOutButton';
import TainaLogo from '../../images/taina_logo.png';
import './Nav.css';

// These props simply come from mapStateToProps below. (not being passed from App.js)
const Nav = props => (
  <div className="nav">
    <Link to="/home">
      {/* Best to not have this NOT as an h1, because then it will the be the h1 on every page */}
      {/* <h2 className="nav-title">Taina App</h2> */}
      <img src={TainaLogo} alt="logo" className="logo" />
    </Link>
    <div className="nav-right">
      <Link className="nav-link" to="/home">
        {/* Ternary auto returns */}
        {/* Link is always on the page, just depends on what the user can see (logged in or not) */}
        {props.user.id ? 'Home' : 'Login / Register'}
      </Link>
      {/* Will not show if the user is not logged in */}
      {/* Like a ternary, but with no else */}
      {props.user.id && (
        <>
          <Link className="nav-link" to="/goal">
            My Goals
          </Link>



          <Link className="nav-link" to="/dissertation">
            My Dissertation Plan
          </Link>

          <LogOutButton className="nav-link" />
        </>
      )}
      {/* <Link className="nav-link" to="/about">
        About
      </Link> */}

    </div>
  </div>
);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
