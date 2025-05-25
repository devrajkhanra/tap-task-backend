const sanitize = require("mongo-sanitize");

// Sanitize middleware to prevent NoSQL injection
const sanitizeInput = (req, res, next) => {
  if (req.body) req.body = sanitize(req.body);
  if (req.params) req.params = sanitize(req.params);
  if (req.query) req.query = sanitize(req.query);
  next();
};

// Role-based access control middleware
const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(403);
      throw new Error(`Requires ${role} role`);
    }
    next();
  };
};

module.exports = { sanitizeInput, requireRole };
