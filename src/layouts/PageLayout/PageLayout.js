import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import Header from '../../components/Header';
import classes from './PageLayout.scss';

export const PageLayout = ({ children }) => (
  <div className={`container ${classes.container}`}>
    <Header />
    <main className={classes.viewport}>
      {children}
    </main>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
