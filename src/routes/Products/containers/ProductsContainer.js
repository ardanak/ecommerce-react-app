import { connect } from 'react-redux';
// import { } from '../modules/products';

import Products from '../components/Products';

const mapDispatchToProps = {};

const mapStateToProps = (state) => ({
  products: state.products.products,
  fetching: state.products.fetchingAllProducts,
  title: 'All Products'
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
