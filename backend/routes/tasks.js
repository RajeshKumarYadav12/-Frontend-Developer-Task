const express = require("express");
const { body, query } = require("express-validator");
const taskController = require("../controllers/taskController");
const { auth } = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = express.Router();

// Validation rules
const createTaskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Invalid status"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),
  body("dueDate").optional().isISO8601().withMessage("Invalid date format"),
  body("tags").optional().isArray().withMessage("Tags must be an array"),
];

const updateTaskValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Invalid status"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),
  body("dueDate").optional().isISO8601().withMessage("Invalid date format"),
  body("tags").optional().isArray().withMessage("Tags must be an array"),
];

const queryValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
  query("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Invalid status"),
  query("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),
  query("search").optional().trim(),
];

// All routes require authentication
router.use(auth);

// Routes
router.get("/", queryValidation, validate, taskController.getTasks);
router.get("/:id", taskController.getTaskById);
router.post("/", createTaskValidation, validate, taskController.createTask);
router.put("/:id", updateTaskValidation, validate, taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
