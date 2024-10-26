const mongoose = require("mongoose");

const NodeSchema = new mongoose.Schema({
  type: String, 
  value: { type: String },
  left: { type: mongoose.Schema.Types.Mixed, default: null },
  right: { type: mongoose.Schema.Types.Mixed, default: null },
});

const RuleSchema = new mongoose.Schema({
  ruleName: { type: String, required: true },
  rootNode: { type: NodeSchema, required: true }
});

const Rule = mongoose.model("Rule", RuleSchema);

module.exports = { Rule, NodeSchema };
