import { fetchFeaturedProducts } from '../Products/modules/products';

// Sync route definition
export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([
      './containers/HomeViewContainer',
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const HomeView = require('./containers/HomeViewContainer').default;

      const currentState = store.getState();
      const { products: { featured } } = currentState;
      if (featured.length == 0) {
        store.dispatch(fetchFeaturedProducts());
      }

      /*  Return getComponent   */
      cb(null, HomeView);

    /* Webpack named bundle   */
    }, 'products');
  }
});
