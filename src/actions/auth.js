import axios from 'axios';
import actionTypes from './actionTypes';

export const fetchUsers = users => ({
  type: actionTypes.FETCH_USERS,
  users,
});

export const fetchUsersAsync = () => (dispatch) => {
  axios.get('/api/users')
    .then((response) => {
      dispatch(fetchUsers(response.data.result));
    })
    .catch(error => error);
};

export const fetchUserGroupsAsync = () => (dispatch) => {
  axios.get('/api/getGroups')
    .then((response) => {
      dispatch(fetchUsers(response.data.result));
    })
    .catch(error => error);
};

export const signUpUser = user => (dispatch) => {
  axios.post('/api/signUpUser', user)
    .then((response) => {
      dispatch(fetchUsers(response.data.result));
    })
    .catch(error => error);
};
