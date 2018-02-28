import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import cookieParser from 'cookie-parser';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import routes from '../src/ssr/routes';
import apiRouter from './routes/apiRouter';
import authRouter from './routes/authRouter';
import reducers from '../src/reducers';
import { verifyJWT_MW } from './controllers/auth';
// import { errorHandler } from 'errorhandler';

// ________________DB_____________________
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql');
const options = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass2sql',
  database: 'issue_tracker',
});
// const sessionStore = new MySQLStore(options);
// const sessionStore
// ________________DB_____________________

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script type="text/javascript" src="/bundle.js"></script>
      </body>
    </html>
    `;
}

function handleRender(req, res) {
  const store = createStore(
    reducers,
    applyMiddleware(thunk),
  );
  // const muiTheme = getMuiTheme({
  //   userAgent: req.headers['user-agent'],
  // });
  const preloadedState = store.getState();
  const context = {};

  const markup = renderToString(
    // <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>,
    // </MuiThemeProvider>
  );

  if (context.url) {
    res.writeHead(301, {
      location: context.url,
    });
    res.end();
  } else {
    res.send(renderFullPage(markup, preloadedState));
  }
  res.end();
}

export default function server() {
  const app = express();
  app.use(cookieParser());
  // app.use(session({
  //   key: 'token',
  //   secret: 'session_cookie_secret',
  //   store: sessionStore,
  //   resave: false,
  //   saveUninitialized: false,
  //   cookie: {
  //     maxAge: 900000,
  //     secure: false,
  //     httpOnly: false,
  //   },
  // }));
  // app.use((req, res, next) => {
  //   if(req.headers.cookie)
  //     const token = req.header.cookie.split(',').split('=')[2];
  //     req.user = decode(user);
  //   else
  //     res.status(403);
  //     res.send();
  //   console.log(req.headers.cookie);
  //   next();
  // })
  app.use(session({ secret: 'keyboard cat', cookie: { httpOnly: true, secure: true, maxAge: 60000 } }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  // app.use(errorHandler());
  app.use(bodyParser.json(), authRouter, apiRouter);

  app.get(['/', '/issues', '/users', '/signup', '/issues', '/history'], handleRender);

  return app;
}
