const { body, validationResult } = require('express-validator');

// Validation middleware for user registration input
const validateRegistrationInput = [
  body('username').notEmpty().withMessage('Username is required').isAlphanumeric().withMessage('Username must be alphanumeric'),
  body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

// Validation middleware for user login input
const validateLoginInput = [
  body('username').notEmpty().withMessage('Username is required').isAlphanumeric().withMessage('Username must be alphanumeric'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Middleware to check for validation errors
const checkValidationResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRegistrationInput,
  validateLoginInput,
  checkValidationResults,
};
