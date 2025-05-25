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
  estimatedTimeMinutes: {
    type: Number,
    min: [1, "Estimated time must be at least 1 minute"],
    max: [
      10080,
      "Estimated time must be less than or equal to 1 week (7 days)",
    ],
    required: false,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
