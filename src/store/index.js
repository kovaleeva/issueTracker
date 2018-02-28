import {
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

// ___________________________________________________
// import { routerMiddleware } from 'react-router-redux'
// import createBrowserHistory from 'history/createBrowserHistory';
// import createMemoryHistory from 'history/createMemoryHistory';
// const history = process.env.BROWSER ? createBrowserHistory() : createMemoryHistory();
// const historyMiddleware = routerMiddleware(history);
// ___________________________________________________

const store = createStore(
  reducers,
  applyMiddleware(
    thunk,
    // historyMiddleware,
  ),
);

export default store;
