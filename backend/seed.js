const mongoose = require("mongoose");
const { Rule } = require("./models/Rule");
const connectDB = require("./config/db");

const sampleRules = [
    {
      ruleName: "Rule 1",
      rootNode: {
        type: "operator",
        value: "AND",
        left: {
          type: "operator",
          value: "OR",
          left: {
            type: "operator",
            value: "AND",
            left: {
              type: "operator",
              value: ">",
              left: { type: "operand", value: "age" },
              right: { type: "operand", value: "30" },
            },
            right: {
              type: "operator",
              value: "=",
              left: { type: "operand", value: "department" },
              right: { type: "operand", value: "Sales" },
            },
          },
          right: {
            type: "operator",
            value: "AND",
            left: {
              type: "operator",
              value: "<",
              left: { type: "operand", value: "age" },
              right: { type: "operand", value: "25" },
            },
            right: {
              type: "operator",
              value: "=",
              left: { type: "operand", value: "department" },
              right: { type: "operand", value: "Marketing" },
            },
          },
        },
        right: {
          type: "operator",
          value: "OR",
          left: {
            type: "operator",
            value: ">",
            left: { type: "operand", value: "salary" },
            right: { type: "operand", value: "50000" },
          },
          right: {
            type: "operator",
            value: ">",
            left: { type: "operand", value: "experience" },
            right: { type: "operand", value: "5" },
          },
        },
      },
    },
    {
      ruleName: "Rule 2",
      rootNode: {
        type: "operator",
        value: "AND",
        left: {
          type: "operator",
          value: ">",
          left: { type: "operand", value: "age" },
          right: { type: "operand", value: "30" },
        },
        right: {
          type: "operator",
          value: "OR",
          left: {
            type: "operator",
            value: ">",
            left: { type: "operand", value: "salary" },
            right: { type: "operand", value: "20000" },
          },
          right: {
            type: "operator",
            value: ">",
            left: { type: "operand", value: "experience" },
            right: { type: "operand", value: "5" },
          },
        },
      },
    },
  ];

async function seedDatabase() {
  await connectDB(); 
  await Rule.deleteMany({});
  const insertedRules = await Rule.insertMany(sampleRules);
  console.log("Sample rules inserted:", insertedRules);
  mongoose.connection.close();
}

module.exports = seedDatabase;
