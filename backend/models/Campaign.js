const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  segmentRules: { type: Object, required: true }, // Store rule logic
  createdAt: { type: Date, default: Date.now },
  audienceSize: { type: Number, default: 0 },
  message: { type: String },
  status: {
    type: String,
    enum: ["pending", "sent", "failed"],
    default: "pending",
  },
});

module.exports = mongoose.model("Campaign", campaignSchema);
