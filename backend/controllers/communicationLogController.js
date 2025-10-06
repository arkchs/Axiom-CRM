const CommunicationLog = require("../models/CommunicationLog");

// In-memory queue for batch updates
const receiptQueue = [];

// Delivery receipt API (enqueue updates)
exports.deliveryReceipt = (req, res) => {
  const { logId, status } = req.body;
  receiptQueue.push({ logId, status, receiptTime: new Date() });
  res.json({ queued: true });
};

// Batch processor (runs every 10 seconds)
setInterval(async () => {
  if (receiptQueue.length === 0) return;
  const batch = receiptQueue.splice(0, receiptQueue.length);
  const bulkOps = batch.map(({ logId, status, receiptTime }) => ({
    updateOne: {
      filter: { _id: logId },
      update: { status, receiptTime },
    },
  }));
  try {
    await CommunicationLog.bulkWrite(bulkOps);
    console.log(`Batch updated ${bulkOps.length} communication logs.`);
  } catch (err) {
    console.error("Batch update error:", err);
  }
}, 10000); // 10 seconds

// Get logs for a campaign
exports.getLogsByCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const logs = await CommunicationLog.find({ campaign: campaignId }).populate(
      "customer"
    );
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
