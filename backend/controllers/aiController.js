const axios = require("axios");

// POST /ai/segment-rules
// { prompt: "People who haven’t shopped in 6 months and spent over ₹5K" }
exports.segmentRulesFromPrompt = async (req, res) => {
  const { prompt } = req.body;
  try {
    // Call Hugging Face Inference API (token required)
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/bert-base-uncased-finetuned-conll03-english",
      { inputs: prompt },
      {
        headers: { Authorization: `Bearer ${process.env.HF_API_TOKEN}` },
      }
    );
    // Extract entities from response
    const entities = response.data[0]?.entity_groups || [];
    // Simple mapping logic
    let segmentRules = {};
    for (const ent of entities) {
      const value = ent.word.replace(/[^\d]/g, "");
      if (/spend|amount|₹|rs|rupees/i.test(ent.entity_group)) {
        segmentRules.spend = Number(value);
      }
      if (/visit/i.test(ent.entity_group)) {
        segmentRules.visits = Number(value);
      }
      if (/inactive|month|day|week/i.test(ent.entity_group)) {
        // Convert months/weeks to days if needed
        segmentRules.inactiveDays =
          Number(value) *
          (/month/i.test(ent.word) ? 30 : /week/i.test(ent.word) ? 7 : 1);
      }
    }
    res.json({ segmentRules, raw: response.data });
  } catch (err) {
    res
      .status(500)
      .json({ error: "AI extraction failed", details: err.message });
  }
};
