const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (req, res, next) => {
  // Extract the token from the request headers
  const token = req.header('Authorization');

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token not provided' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, config.secretKey);

    // Attach the decoded user information to the request object for further use
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

module.exports = authMiddleware;
