const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/userController");
const { auth } = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = express.Router();

// Validation rules
const updateProfileValidation = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("bio")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Bio cannot exceed 500 characters"),
  body("avatar")
    .optional()
    .trim()
    .isURL()
    .withMessage("Avatar must be a valid URL"),
];

// Protected routes (require authentication)
router.get("/profile", auth, userController.getProfile);
router.put(
  "/profile",
  auth,
  updateProfileValidation,
  validate,
  userController.updateProfile,
);

module.exports = router;
