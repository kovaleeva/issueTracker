import React from 'react';
import { hydrate } from 'react-dom';
import thunk from 'redux-thunk';
// import store from '../store';
// import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from './ssr/routes';
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(thunk));

const AppRouter = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Provider>
  );
};

hydrate(
  <AppRouter />,
  document.querySelector('#root'),
);

// ___________________________________________________
//
// import createBrowserHistory from 'history/createBrowserHistory';
// import createMemoryHistory from 'history/createMemoryHistory';
// const history = process.env.BROWSER ? createBrowserHistory() : createMemoryHistory();
// import { createBrowserHistory  } from 'react-router';
// import { createStore, combineReducers } from 'redux';
// import {
//   ConnectedRouter, syncHistoryWithStore,
//   routerReducer
// } from 'react-router-redux';
// import reducers from '../reducers';
// const store = createStore(
//   combineReducers({
//     ...reducers,
//     routing: routerReducer,
//   }),
// );
// const history = syncHistoryWithStore(createBrowserHistory, store);
//
// ___________________________________________________
