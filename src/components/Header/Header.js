import React from 'react';
import { IndexLink, Link } from 'react-router';
import classes from './Header.scss';
import reactIcon from '../../static/img/favicon.ico';

export const Header = () => (
  <header>
    <nav className={`navbar navbar-default ${classes.nav}`}>
      <div className='container-fluid'>
        <ul className='nav navbar-nav'>
          <li>
            <a><img src={reactIcon} /></a>
          </li>
          <li><IndexLink to='/'>
            <h2 className={classes.h2}>Home</h2>
          </IndexLink></li>
          <li><Link to='/products'><h2 className={classes.h2}>Products</h2></Link></li>
        </ul>
        <form className='navbar-form navbar-right'>
          <div className='form-group'>
            <input type='text' className='form-control' placeholder='Search' />
          </div>
        </form>
      </div>
    </nav>
  </header>
);

export default Header;
