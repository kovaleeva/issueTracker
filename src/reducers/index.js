import {
  combineReducers,
} from 'redux';

import issues from './issues';
import auth from './auth';
import historyReducer from './history';

const reducers = combineReducers({
  issues,
  auth,
  historyReducer,
});

export default reducers;
