import React from 'react';
import PropTypes from 'prop-types';
import classes from './HomeView.scss';

export const HomeView = ({ fetching, featuredProducts }) => (
  <div className={classes.container}>
    <header className={classes.pageHeader}>
      <h2>Featured products</h2>
    </header>
    {/* TODO extract out this sidepanel as a reuseable component */}
    <aside className={`col-md-2 ${classes.sidepanel}`}>
      <ul className={classes.links}>
        <li><a>Women's</a></li>
        <li><a>Men's</a></li>
        <li><a>Youth</a></li>
        <li><a>Sale</a></li>
        <li><a>Clearance</a></li>
      </ul>
    </aside>
    <section className='col-md-10'>
      <ul className={`row ${classes.featured}`}>
        <li className='col-md-6'>
          <div>
            <img src={featuredProducts[0].img_src} />
            <label>{featuredProducts[0].name}</label>
          </div>
        </li>
        <li className='col-md-6'>
          <div>
            <img src={featuredProducts[1].img_src} />
            <label>{featuredProducts[1].name}</label>
          </div>
        </li>
      </ul>
      <ul className={`row ${classes.featured}`}>
        <li className='col-md-6'>
          <div>
            <img src={featuredProducts[2].img_src} />
            <label>{featuredProducts[2].name}</label>
          </div>
        </li>
        <li className='col-md-6'>
          <div>
            <img src={featuredProducts[3].img_src} />
            <label>{featuredProducts[3].name}</label>
          </div>
        </li>
      </ul>
    </section>
  </div>
);

HomeView.propTypes = {
  fetching: PropTypes.bool,
  featuredProducts: PropTypes.array
};

export default HomeView;
