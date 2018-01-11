import { injectReducer } from '../../store/reducers';
import { fetchAllProducts } from './modules/products';

export default (store) => ({
  path : 'products',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './containers/ProductsContainer',
      './modules/products'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Products = require('./containers/ProductsContainer').default;

      const currentState = store.getState();
      const { products: { products } } = currentState;
      if (products.length == 0) {
        store.dispatch(fetchAllProducts());
      }

      /*  Return getComponent   */
      cb(null, Products);

    /* Webpack named bundle   */
    }, 'products');
  }
});
