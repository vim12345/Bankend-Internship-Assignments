const config = require('../config');

module.exports = {
    mongoURI: 'your-mongodb-connection-string',
    secretKey: 'your-secret-key-for-jwt',
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    },
  };
  