import {
  connect,
} from 'react-redux';

import {
  signInUser,
} from '../actions/index';

import SignIn from '../components/auth/SignIn';

const mapDispatchToProps = dispatch => ({
  onSignIn: user => dispatch(signInUser(user)),
});

const mapStateToProps = () => ({});

const SignInContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);

export default SignInContainer;
