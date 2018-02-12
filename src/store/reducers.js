import { combineReducers } from 'redux'
import locationReducer from './location'
import products from '../routes/Products/modules/products';
import auth0 from '../modules/auth0';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    products,
    auth0,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
