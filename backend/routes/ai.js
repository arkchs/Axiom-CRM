const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");
const ensureAuthenticated = require("../middleware/auth");

// Natural language to segment rules
router.post(
  "/segment-rules",
  ensureAuthenticated,
  aiController.segmentRulesFromPrompt
);

module.exports = router;
