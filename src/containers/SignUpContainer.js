import {
  connect,
} from 'react-redux';

import {
  fetchGroupsAsync,
  signUpUser,
} from '../actions/index';

import SignUp from '../components/auth/SignUp';

const mapDispatchToProps = dispatch => ({
  onGroupsFetch: () => dispatch(fetchGroupsAsync()),
  onSignUp: user => dispatch(signUpUser(user)),
});

const mapStateToProps = state => ({
  groups: state.auth.userGroups,
});

const SignUpContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);

export default SignUpContainer;
