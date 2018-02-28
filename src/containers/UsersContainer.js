import {
  connect,
} from 'react-redux';

import {
  fetchUsersAsync,
} from '../actions/index';

import UsersList from '../components/UsersList';

const mapDispatchToProps = dispatch => ({
  onUsersFetch: () => dispatch(fetchUsersAsync()),
});

const mapStateToProps = state => ({
  users: state.auth.users,
});

const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersList);

export default UsersContainer;
