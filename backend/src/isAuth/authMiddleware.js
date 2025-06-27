// DEVELOPMENT BYPASS: Always authenticate as a mock user for local development
// Comment out the original authentication logic below for easy revert
/*
const jwt = require('jsonwebtoken');

const apiIsLoggedIn = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    console.log("isAuth");
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    // Check if the token is present and valid
    if (token && jwt.verify(token, process.env.JWT_SECRET)) {
      // Decode the token and set user information in req.user
      req.user = jwt.decode(token);
      return next();
    }
  } catch (e) {
    console.error('Token verification error:', e);
  }

  // If the token is missing or invalid, respond with 401 Unauthorized
  return res.sendStatus(401);
};
*/

// Bypass authentication: always set a mock user
const apiIsLoggedIn = (req, res, next) => {
  req.user = {
    id: 1,
    username: 'devuser',
    email: 'dev@local',
    // add other fields as needed
  };
  return next();
};

module.exports = apiIsLoggedIn;

