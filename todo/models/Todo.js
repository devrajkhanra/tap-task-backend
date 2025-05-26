const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
    required: true,
  },
  dueDate: { type: Date, required: true }, // Mandatory
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

// Automatically mark as completed if due date has passed
todoSchema.pre("save", function (next) {
  if (this.dueDate && new Date(this.dueDate) < new Date()) {
    this.status = "completed";
  }
  next();
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
