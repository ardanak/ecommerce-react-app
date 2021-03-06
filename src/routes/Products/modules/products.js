// ------------------------------------
// Constants
// ------------------------------------
// export const FETCHING_PRODUCTS = 'FETCHING_PRODUCTS';
export const FETCHING_ALL_PRODUCTS = 'FETCHING_ALL_PRODUCTS';
export const RECEIVE_ALL_PRODUCTS = 'RECEIVE_ALL_PRODUCTS';
export const FETCHING_FEATURED_PRODUCTS = 'FETCHING_FEATURED_PRODUCTS';
export const RECEIVE_FEATURED_PRODUCTS = 'RECEIVE_FEATURED_PRODUCTS';

// ------------------------------------
// Actions
// ------------------------------------

// export function fetchingProducts () {
//   return {
//     type : FETCHING_PRODUCTS
//   };
// }

export function fetchingAllProducts () {
  return {
    type: FETCHING_ALL_PRODUCTS
  };
}

export function receiveAllProducts (json) {
  const { products } = json;
  return {
    type: RECEIVE_ALL_PRODUCTS,
    payload: products
  };
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

// a thunk is more useful for rest api queries, here I'm using data from a local file
// TODO swap out with a call to a rest api to get product data
export function fetchAllProducts () {
  return (dispatch) => {
    dispatch(fetchingAllProducts());
    return new Promise(() => {
      const data = require('../../../data/data.json');
      dispatch(receiveAllProducts(data));
    });
    // example of an actual query would look like this
    // return fetch(REST_API_ENDPOINT, {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': AUTH_TOKEN,
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(QUERY_BODY)
    // })
    //     .then(response => response.json())
    //     .then(json => dispatch(receiveAllProducts(json)))
  };
}

export function fetchingFeaturedProducts () {
  return {
    type: FETCHING_FEATURED_PRODUCTS
  };
}

export function receiveFeaturedProducts (json) {
  const { featured } = json;
  return {
    type: RECEIVE_FEATURED_PRODUCTS,
    payload: featured
  };
}

export function fetchFeaturedProducts () {
  return (dispatch) => {
    dispatch(fetchingFeaturedProducts());
    return new Promise(() => {
      const data = require('../../../data/data.json');
      dispatch(receiveFeaturedProducts(data));
    });
  };
}

export const actions = {
  fetchAllProducts,
  fetchFeaturedProducts
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  // [FETCHING_PRODUCTS]: (state) => {
  //   return ({
  //     ...state,
  //     fetching: true,
  //   });
  // },
  [FETCHING_ALL_PRODUCTS]: (state) => {
    return ({
      ...state,
      fetching: true,
      fetchingAllProducts: true
    });
  },
  [RECEIVE_ALL_PRODUCTS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      fetchingAllProducts: false,
      products: action.payload
    });
  },
  [FETCHING_FEATURED_PRODUCTS]: (state) => {
    return ({
      ...state,
      fetching: true,
      fetchingFeaturedProducts: true
    });
  },
  [RECEIVE_FEATURED_PRODUCTS]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      fetchingFeaturedProducts: false,
      featured: action.payload
    });
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,
  fetchingAllProducts: false,
  fetchingFeaturedProducts: false,
  products: [],
  featured: []
};

export default function productsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
