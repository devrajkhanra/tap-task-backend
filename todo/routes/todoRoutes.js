const express = require("express");
const router = express.Router();
const { protect } = require("../../middleware/authMiddleware");
// import todo controller functions
const {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
  toggleTodoCompletion,
} = require("../controllers/todoController");

// create todo route
console.log("Create Todo Route");
router.post("/user/:userId", protect, createTodo);

// get all todos
router.get("/user/:userId", protect, getAllTodos);

// Update a todo
router.put("/user/:userId/:todoId", protect, updateTodo);

// Delete a todo
router.delete("/user/:userId/:todoId", protect, deleteTodo);

// Toggle todo completion status
router.patch("/user/:userId/:todoId/toggle", protect, toggleTodoCompletion);

module.exports = router;
