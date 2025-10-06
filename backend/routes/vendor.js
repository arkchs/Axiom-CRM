const express = require("express");
const router = express.Router();
const axios = require("axios");

// Simulate vendor message delivery
router.post("/send", async (req, res) => {
  const { logId, message, receiptUrl } = req.body;
  // Simulate delivery status
  const isSent = Math.random() < 0.9;
  const status = isSent ? "SENT" : "FAILED";

  // Call delivery receipt API
  try {
    await axios.post(receiptUrl, { logId, status });
    res.json({ logId, status });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Receipt API call failed", details: err.message });
  }
});

module.exports = router;
