const { validationResult } = require("express-validator");

/**
 * Middleware to handle validation errors
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((error) => ({
        field: error.path || error.param,
        message: error.msg,
      })),
    });
  }

  next();
};

module.exports = validate;
