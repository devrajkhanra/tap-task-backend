const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const authRoutes = require("./user/routes/authRoutes");
const todoRoutes = require("./todo/routes/todoRoutes");
const errorHandler = require("./middleware/errorHandler");
const listEndpoints = require("express-list-endpoints");

dotenv.config();

const app = express();

// Security Middleware
app.use(helmet()); // Adds various HTTP headers for security
app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      "http://localhost:5173" ||
      "https://tap-task-theta.vercel.app",
    credentials: true, // Allow cookies with CORS
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api/", limiter);

// Regular Middleware
app.use(express.json({ limit: "10kb" })); // Body limit is 10kb
app.use(cookieParser());

// Database Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Error Handling
app.use(errorHandler);

// console.log("Available Routes:", listEndpoints(app));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
