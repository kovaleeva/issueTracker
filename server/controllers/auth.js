const jwt = require('jsonwebtoken');
const config = require('./config');

const createJWToken = (user) => {
  return jwt.sign(
    user,
    config.secret, {
      expiresIn: 60 * 60 * 24,
    },
  );
};


const verifyJWTToken = token => new Promise((resolve, reject) => {
  jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }
      resolve(decodedToken);
    },
  );
});

// MIDDLEWARE
const verifyJWT_MW = (req, res, next) => {
  const token = (req.method === 'POST') ? req.body.token : req.query.token;

  verifyJWTToken(token)
    .then((decodedToken) => {
      req.body = decodedToken.data,
      next();
    })
    .catch((err) => {
      res.status(400)
        .json({
          message: 'Invalid auth token provided.',
        });
    });
};


// function a(req, res, next) {
//   if (req.session.cookie.token)
//     const user = decodeToken(token);
//   req.user = user;
//   next();
// }


// const createRefreshToken = (req, res, next) => {
//   if (!req.user.refreshToken) {
//     req.refreshToken = jwt.sign({
//       type: 'refresh',
//     }, config.secret, {
//       expiresIn: 60 * 60 * 24 * 90,
//     });
//     authService.findOneAndUpdate({
//       email: req.user.email,
//     }, {
//       refreshToken: req.refreshToken,
//     })
//       .then(() => {
//         next();
//       })
//       .catch(err => errors.errorHandler(res, err));
//   } else {
//     req.refreshToken = req.user.refreshToken;
//     next();
//   }
// };

// const validateRefreshToken = (req, res, next) => {
//   if (req.body.refreshToken !== '') {
//     authService.findOne({
//       refreshToken: req.body.refreshToken,
//     })
//       .then((user) => {
//         req.user = user;
//         next();
//       })
//       .catch(err => errors.errorHandler(res, err));
//   } else {
//     return errors.errorHandler(res, 'There is no refresh token to check.');
//   }
// };

module.exports = {
  createJWToken,
  verifyJWTToken,
  // createRefreshToken,
  // validateRefreshToken,
};
