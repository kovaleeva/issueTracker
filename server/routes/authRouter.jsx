const authRouter = require('express').Router();

const bcrypt = require('bcrypt');
const errors = require('../controllers/errors');
const auth = require('../controllers/auth');
const authService = require('../services/authService');

authRouter.get('/api/users', (req, res) => {
  res.cookie('token', jwn.sign(), { httpOnly: true, secure: true });
  authService.getUsers()
    .then(result => res.status(200).json({
      result,
    }))
    .catch(error => res.status(500).json({
      error,
    }));
});

authRouter.get('/api/userGroups', (req, res) => {
  authService.getUserGroups()
    .then(result => res.status(200).json({
      result,
    }))
    .catch(error => res.status(500).json({
      error,
    }));
});

authRouter.post('/api/signUp', (req, res, next) => {
  authService.checkExistEmail(req.body)
    .then((result) => {
      if (!req.body.email || !req.body.password) {
        return errors.errorHandler(
          res,
          'You must send the username and the password.',
        );
      }
      const passwordHash = bcrypt.hashSync(req.body.password.trim(), 12);
      req.body.password = passwordHash;
      if (result.length > 0) {
        return errors.errorHandler(
          res,
          'A user with that username already exists.',
        );
      }
      return authService.signUpUser(req.body);
    })
    .then(result => res.redirect('/', 200).json({
      result,
    }))
    .catch(error => res.status(500).json({
      error,
    }));
});


authRouter.post('/login', (req, res, next) => {
  authService.checkExistEmail(req.body)
    .then((result) => {
      if (!req.body.email || !req.body.password) {
        return errors.errorHandler(
          res,
          'You must send the username and the password.',
        );
      }
      if (result.length === 0) {
        return errors.errorHandler(
          res,
          'A user with that email not exists.',
        );
      }
      bcrypt.compareSync(req.body.password, result[0].password, (err, success) => {
        if (err) {
          return errors.errorHandler(
            res,
            'The has been an unexpected error, please try again later',
          );
        }
        if (!success) {
          return errors.errorHandler(res, 'Your password is incorrect.');
        }
        [req.user] = result;
        return auth.createJWToken(req.user);
      });
    })
    .then(result => res.status(200).json({
      token: result,
    }))
    .catch(error => res.status(500).json({
      error,
    }));
});


function authenticate(token) {
  try {
    // decode token to get user
    const user = jwt.verify(token, 'secretword');
    // go to db find user.email and passwrord phraze
    // if not - send to login
    // else
    next();
  } catch (err) {
    // redirect to login page
  }
}

authRouter.post('/logout', (req, res) => {
  authService.checkExistEmail(req.body)
    .then((result) => {
      if (!req.body.email || !req.body.password) {
        return errors.errorHandler(
          res,
          'You must send the username and the password.',
        );
      }
      if (result.length === 0) {
        return errors.errorHandler(
          res,
          'A user with that email not exists.',
        );
      }
      bcrypt.compareSync(req.body.password, result[0].password, (err, success) => {
        if (err) {
          return errors.errorHandler(
            res,
            'The has been an unexpected error, please try again later',
          );
        }
        if (!success) {
          return errors.errorHandler(res, 'Your password is incorrect.');
        }
        req.user = result[0];
        req.activity = 'login';
        return auth.createToken;
        next();
      });
    })
    .then(result => res.status(200).json({
      result,
    }))
    .catch(error => res.status(500).json({
      error,
    }));
});


module.exports = authRouter;
