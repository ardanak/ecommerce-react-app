import { connect } from 'react-redux';
import { login, logout, signup } from '../../modules/auth0';
import PageLayout from './PageLayout';

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.auth0.isAuthenticated,
  fetching: state.auth0.isFetching,
  // TODO
  // profile: state.auth0.profile, this should be on separate user account route
  errors: {
    accessTokenErr: state.auth0.accessTokenErr,
    lockError: state.auth0.lockError
  },
  messages: {
    logoutMessageSuccess: state.auth0.logoutMessageSuccess,
    logoutMessageErr: state.auth0.logoutMessageErr
  },
  username: state.auth0.profile ? state.auth0.profile.nickname : null
});

const mapActionCreators = {
  login,
  logout,
  signup
};

export default connect(mapStateToProps, mapActionCreators)(PageLayout);
