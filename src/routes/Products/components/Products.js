import React from 'react';
import PropTypes from 'prop-types';

export const Products = ({ fetching, products }) => {
  // console.log('products', products);
  return (
    <div>Products page</div>
  );
};

Products.propTypes = {
  fetching: PropTypes.bool,
  products: PropTypes.array
};

export default Products;
