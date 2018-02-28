import actionTypes from '../actions/actionTypes';

const inititialState = {
  issues: [],
  types: [],
  status: [],
};

const issues = (state = inititialState, action) => {
  switch (action.type) {
    case (actionTypes.FETCH_ISSUES):
      return {
        ...state,
        issues: [...action.issues],
      };
    case (actionTypes.FETCH_TYPES):
      return {
        ...state,
        types: [...action.types],
      };
    case (actionTypes.FETCH_STATUS):
      return {
        ...state,
        status: [...action.status],
      };
    default:
      return state;
  }
};

export default issues;
