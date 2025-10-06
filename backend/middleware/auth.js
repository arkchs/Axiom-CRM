// Middleware to ensure user is authenticated
module.exports = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized: Please log in with Google." });
};
