const express = require("express");
const router = express.Router();
const communicationLogController = require("../controllers/communicationLogController");

// Delivery receipt
router.post("/receipt", communicationLogController.deliveryReceipt);
// Get logs by campaign
router.get(
  "/campaign/:campaignId",
  communicationLogController.getLogsByCampaign
);

module.exports = router;
