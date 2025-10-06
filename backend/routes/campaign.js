const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campaignController");

const ensureAuthenticated = require("../middleware/auth");
// Create campaign
router.post("/", ensureAuthenticated, campaignController.createCampaign);
// Get campaign history
router.get("/", ensureAuthenticated, campaignController.getCampaigns);

module.exports = router;
