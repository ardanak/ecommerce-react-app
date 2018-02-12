import React from 'react';
import { IndexLink, Link } from 'react-router';
import classes from './Header.scss';
import reactIcon from '../../static/img/favicon.ico';
import PropTypes from 'prop-types';

export const Header = ({ login, logout, signup, isAuthenticated, username }) => (
  <header>
    <nav className='navbar navbar-default'>
      <div className='container-fluid'>
        <ul className='nav navbar-nav'>
          <li>
            <a><img src={reactIcon} /></a>
          </li>
          <li><IndexLink to='/'>
            <h2 className={classes.h2}>Home</h2>
          </IndexLink></li>
          <li><Link to='/products'><h2 className={classes.h2}>Products</h2></Link></li>
          {/* <li><Link to='/products'><h2 className={classes.h2}>Men's</h2></Link></li>
          <li><Link to='/products'><h2 className={classes.h2}>Women's</h2></Link></li>
          <li><Link to='/products'><h2 className={classes.h2}>Youth</h2></Link></li> */}
        </ul>
        {/* <form className='navbar-form navbar-right'>
          <div className='form-group'>
            <input type='text' className='form-control' placeholder='Search' />
          </div>
        </form> */}
        <div className='nav navbar-nav navbar-right'>
          {!isAuthenticated &&
          <div>
            <div className={classes.welcomeGuest}>Welcome Guest!</div>
            <a className={`btn btn-xs ${classes.loginBtn}`} onClick={login}>login</a>
            <a className={`btn btn-xs ${classes.signupBtn}`} onClick={signup}>signup</a>
          </div>}
          {isAuthenticated &&
            <div>
              <div className={classes.welcomeGuest}>Welcome {username}</div>
              <a className={`btn btn-xs ${classes.logoutBtn}`} onClick={logout}>logout</a>
            </div>}
        </div>
      </div>
    </nav>
  </header>
);

Header.propTypes = {
  login: PropTypes.func,
  logout: PropTypes.func,
  signup: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  username: PropTypes.object
};

export default Header;
