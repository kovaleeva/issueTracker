import axios from 'axios';
import actionTypes from './actionTypes';
// import auth from './auth';

export const fetchIssues = issues => ({
  type: actionTypes.FETCH_ISSUES,
  issues,
});

export const fetchIssuesAsync = () => (dispatch) => {
  axios.get('/api/issues')
    .then((response) => {
      dispatch(fetchIssues(response.data.result));
    })
    .catch(error => error);
};

export const fetchTypes = types => ({
  type: actionTypes.FETCH_TYPES,
  types,
});

export const fetchTypesAsync = () => (dispatch) => {
  axios.get('/api/issueTypes')
    .then((response) => {
      dispatch(fetchTypes(response.data.result));
    })
    .catch(error => error);
};

export const fetchStatus = status => ({
  type: actionTypes.FETCH_STATUS,
  status,
});

export const fetchStatusAsync = () => (dispatch) => {
  axios.get('/api/issueStatus')
    .then((response) => {
      dispatch(fetchStatus(response.data.result));
    })
    .catch(error => error);
};

export const addIssue = issue => (dispatch) => {
  axios.post('/api/issue', issue)
    .then((response) => {
      dispatch(fetchIssues(response.data.result));
    })
    .catch(error => error);
};


export const editIssue = issue => (dispatch) => {
  axios.put('/api/issueEdit', issue)
    .then((response) => {
      dispatch(fetchIssues(response.data.result));
    })
    .catch(error => error);
};


export const deleteIssue = id => (dispatch) => {
  axios.delete('/api/issueDelete', { params: { id } })
    .then((response) => {
      dispatch(fetchIssues(response.data.result));
    })
    .catch(error => error);
};

// _____________________________________
// ____________AUTH_____________________
// _____________________________________

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

export const fetchGroups = groups => ({
  type: actionTypes.FETCH_GROUPS,
  groups,
});

export const fetchGroupsAsync = () => (dispatch) => {
  axios.get('/api/userGroups')
    .then((response) => {
      dispatch(fetchGroups(response.data.result));
    })
    .catch(error => error);
};

export const signUpUser = user => (dispatch) => {
  axios.post('/api/signUp', user)
    .then((response) => {
      dispatch(fetchUsers(response.data.result));
    })
    .catch(error => error);
};

export const signInUser = user => (dispatch) => {
  axios.post('/api/signIn', user)
    .then((response) => {
      dispatch(fetchUsers(response.data.result));
    })
    .catch(error => error);
};

// _____________________________________
// ____________HISTORY__________________
// _____________________________________

export const fetchHistory = changes => ({
  type: actionTypes.FETCH_HISTORY,
  changes,
});

export const fetchHistoryAsync = () => (dispatch) => {
  axios.get('/api/history')
    .then((response) => {
      dispatch(fetchHistory(response.data.result));
    })
    .catch(error => error);
};

