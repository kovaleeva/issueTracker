import actionTypes from '../actions/actionTypes';

const inititialState = {
  changes: [],
};

const historyReducer = (state = inititialState, action) => {
  switch (action.type) {
    case (actionTypes.FETCH_HISTORY):
      return {
        ...state,
        changes: [...action.changes],
      };
    default:
      return state;
  }
};

export default historyReducer;
