import Auth0Lock from 'auth0-lock';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '../creds.js';

// ------------------------------------
// Constants
// ------------------------------------
export const SHOW_LOCK = 'SHOW_LOCK';
export const LOCK_SUCCESS = 'LOCK_SUCCESS';
export const LOCK_FAILURE = 'LOCK_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const ACCESS_TOKEN_ERROR = 'ACCESS_TOKEN_ERROR';

// ------------------------------------
// Actions
// ------------------------------------

function showLock() {
  return {
    type: SHOW_LOCK
  };
}

function lockSuccess(idToken, profile) {
  return {
    type: LOCK_SUCCESS,
    payload: {
      idToken,
      profile
    }
  };
}

function lockError(err) {
  return {
    type: LOCK_FAILURE,
    payload: err
  };
}

function accessTokenErr(error) {
  return {
    type: ACCESS_TOKEN_ERROR,
    payload: error
  };
}

export function login() {
  // Auth0 lock options
  const options = {
    auth: {
      // redirectUri: window.location.href,
      redirect: false,
      responseType: 'token id_token',
      audience: 'https://auth-server.auth0.com/userinfo',
      params: {
        scope: 'openid profile email'
      },
      sso: false
    },
    rememberLastLogin: false,
    allowSignUp: false
  };
  // Opens the Auth0 lock widget
  const lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, options);
  return dispatch => {
    dispatch(showLock());
    lock.show();
    lock.on('authenticated', (authResult) => {
      lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          dispatch(accessTokenErr(error));
        } else {
          console.log('authResult', authResult);
          localStorage.setItem('exp', authResult.idTokenPayload.exp);
          localStorage.setItem('id_token', authResult.idToken);
          localStorage.setItem('access_token', authResult.accessToken);
          localStorage.setItem('profile', JSON.stringify(profile));
          dispatch(lockSuccess(JSON.stringify(authResult.idToken), profile));
        }
      });
    });
    lock.on('authorization_error', (error) => dispatch(lockError(error)));
  };
}

function logoutRequest() {
  return {
    type: LOGOUT_REQUEST
  };
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
    payload: "You've successfully logged out"
  };
}

function logoutFailure() {
  return {
    type: LOGOUT_FAILURE,
    payload: 'Oops, something went wrong. Try logging out again or refresh page.'
  };
}

export function logout() {
  return dispatch => {
    dispatch(logoutRequest());
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('exp');
    if (localStorage.getItem('id_token')) {
      return dispatch(logoutFailure());
    }
    return dispatch(logoutSuccess());
  };
}

function getAuthenticationStatus() {
  const token = localStorage.getItem('id_token');
  console.log(token);
  if (token) {
    const tokenExp = localStorage.getItem('exp');
    let expiryDate = new Date(0);
    expiryDate.setUTCSeconds(tokenExp);
    console.log('expiresAt', expiryDate);
    return new Date() < expiryDate;
  }
}

function initAuth() {
  if (getAuthenticationStatus()) {
    const profile = JSON.parse(localStorage.getItem('profile'));
    const token = localStorage.getItem('id_token');

    return {
      isAuthenticated: true,
      idToken: token,
      profile: profile
    };
  } else {
    return {};
  }
}

export function signup() {
  const options = {
    rememberLastLogin: false,
    initialScreen: 'signUp',
    allowSignUp: true,
    allowLogin: false,
    allowForgotPassword: true,
    loginAfterSignUp: false
  };
  // Opens the Auth0 lock widget
  const lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, options);
  return dispatch => {
    dispatch(showLock());
    lock.show();
    lock.on('signup submit', () => {
      login();
    });
    lock.on('authorization_error', (error) => dispatch(lockError(error)));
  };
}

export const actions = {
  login,
  logout
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const AUTH0_ACTION_HANDLERS = {
  [SHOW_LOCK]: (state, action) => {
    return ({
      ...state,
      isFetching: true,
      isAuthenticated: false
    });
  },
  [LOCK_SUCCESS]: (state, action) => {
    console.log(action.idToken);
    return ({
      ...state,
      isFetching: false,
      isAuthenticated: true,
      idToken: action.payload.idToken,
      profile: action.payload.profile
    });
  },
  [LOCK_FAILURE]: (state, action) => {
    return ({
      ...state,
      isFetching: false,
      isAuthenticated: false,
      lockError: action.payload
    });
  },
  [ACCESS_TOKEN_ERROR]: (state, action) => {
    return ({
      ...state,
      accessTokenErr: action.payload
    });
  },
  [LOGOUT_REQUEST]: (state, action) => {
    return ({
      ...state
    });
  },
  [LOGOUT_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isAuthenticated: false,
      idToken: null,
      profile: null,
      logoutMessageSuccess: action.payload
    });
  },
  [LOGOUT_FAILURE]: (state, action) => {
    return ({
      ...state,
      logoutMessageErr: action.payload
    });
  }
};

const initialState = initAuth();

export default function auth0Reducer(state = initialState, action) {
  const handler = AUTH0_ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
