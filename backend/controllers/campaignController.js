const Campaign = require("../models/Campaign");
const CommunicationLog = require("../models/CommunicationLog");
const Customer = require("../models/Customer");

// Create a new campaign
exports.createCampaign = async (req, res) => {
  try {
    const { name, segmentRules, message } = req.body;
    // Find customers matching segmentRules
    // segmentRules: { spend, visits, inactiveDays }
    const { spend, visits, inactiveDays } = segmentRules || {};
    const filter = {};
    if (typeof spend === "number") {
      filter.totalSpend = { $gte: spend };
    }
    if (typeof visits === "number") {
      filter.visits = { $lte: visits };
    }
    if (typeof inactiveDays === "number") {
      const inactiveDate = new Date();
      inactiveDate.setDate(inactiveDate.getDate() - inactiveDays);
      filter.lastActive = { $lte: inactiveDate };
    }
    const customers = await Customer.find(filter);
    const audienceSize = customers.length;
    const campaign = new Campaign({
      name,
      segmentRules,
      message,
      audienceSize,
    });
    await campaign.save();

    // For each customer, create a communication log and send message via vendor API
    const logs = [];
    for (const customer of customers) {
      const log = new CommunicationLog({
        campaign: campaign._id,
        customer: customer._id,
        message: `Hi ${customer.name}, ${message}`,
        status: "SENT", // Initial status, will be updated by receipt
      });
      await log.save();
      logs.push(log);

      // Call vendor API to simulate delivery
      const axios = require("axios");
      try {
        await axios.post("http://localhost:5000/vendor/send", {
          logId: log._id,
          message: log.message,
          receiptUrl: "http://localhost:5000/communication-logs/receipt",
        });
      } catch (err) {
        // Vendor API call failed, optionally handle error
      }
    }

    res.status(201).json({ campaign, logs });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all campaigns (history)
exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
