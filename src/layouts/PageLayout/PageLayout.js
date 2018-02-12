import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import classes from './PageLayout.scss';

// TODO implement appropriate placement/usage of messages and errors props
export const PageLayout = ({ children, login, logout, signup, fetching, isAuthenticated, errors, messages, username }) => (
  <div className={`container ${classes.container}`}>
    <Header
      login={login}
      logout={logout}
      signup={signup}
      isAuthenticated={isAuthenticated}
      username={username} />
    <main className={classes.viewport}>
      {children}
    </main>
  </div>
);
PageLayout.propTypes = {
  children: PropTypes.node,
  login: PropTypes.func,
  logout: PropTypes.func,
  signup: PropTypes.func,
  fetching: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  errors: PropTypes.object,
  messages: PropTypes.object,
  username: PropTypes.object
};

export default PageLayout;
