import actionTypes from '../actions/actionTypes';

const inititialState = {
  users: [],
  userGroups: [],
};

const auth = (state = inititialState, action) => {
  switch (action.type) {
    case (actionTypes.FETCH_USERS):
      return {
        ...state,
        users: [...action.users],
      };
    case (actionTypes.FETCH_GROUPS):
      return {
        ...state,
        userGroups: [...action.groups],
      };
    default:
      return state;
  }
};

export default auth;
