import React from 'react';
import PropTypes from 'prop-types';
import classes from './Products.scss';

export const Products = ({ fetching, products, title }) => {
  // temporarily create more products to show on page
  const triple = products.concat(products).concat(products);
  return (
    <main>
      {title &&
        <div className={classes.title}>
          <h2>{title}</h2>
        </div>}
      <hr />
      {triple.map((product) => (
        <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2'>
          <div className={classes.product}>
            <div className={classes.productInner}>
              <div onClick='' className={classes.img}>
                <img src={product.img_src} />
              </div>
              <div onClick='' className={classes.productName}>
                <h2>{product.name}</h2>
              </div>
              <div className={classes.price}>
                ${product.price}
              </div>
            </div>
          </div>
        </div>
      )
    )}
    </main>
  );
};

Products.propTypes = {
  fetching: PropTypes.bool,
  products: PropTypes.array,
  title: PropTypes.string
};

export default Products;
