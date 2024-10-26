const express = require('express');
const router = express.Router();
const create_rule = require('../utils/create_rule');
const { Rule } = require("../models/Rule");
const combine_rules = require('../utils/combine_rules'); 
const evaluateRule = require("../utils/evaluate_rule");



router.post('/', async (req, res) => {
    const { ruleString } = req.body;

    if (!ruleString || typeof ruleString !== 'string') {
        return res.status(400).json({ error: 'Invalid input. ruleString is required and must be a string.' });
    }

    try {
        const ast = create_rule(ruleString);
        res.status(200).json(ast);
    } catch (error) {
        console.error('Error creating AST:', error);
        res.status(500).json({ error: 'Failed to create AST.' });
    }
});

router.get('/', async (req, res) => {
    try {
        const rules = await Rule.find(); 
        res.status(200).json(rules);
    } catch (error) {
        console.error('Error fetching rules:', error);
        res.status(500).json({ error: 'Failed to fetch rules.' });
    }
});


router.post('/combine', async (req, res) => {
    const { ruleIds } = req.body;

    try {
        // Fetch rules from DB
        const rules = await Rule.find({ _id: { $in: ruleIds } });

        if (!rules.length) {
            return res.status(404).json({ error: 'No rules found for the provided IDs.' });
        }

        const asts = rules.map(rule => rule.rootNode).filter(node => node); // Filter out null nodes
        if (asts.length === 0) {
            return res.status(400).json({ error: 'No valid ASTs found.' });
        }

        const combinedAST = combine_rules(asts); // Combine the ASTs using your combine_rules function

        if (!combinedAST) {
            return res.status(400).json({ error: 'Combined AST is null.' });
        }

        res.json({ rootNode: combinedAST });
    } catch (error) {
        console.error("Error combining rules:", error);
        res.status(500).json({ error: 'An error occurred while combining rules.' });
    }
});


router.post("/evaluate", async (req, res) => {
    try {
        console.log("Received request data:", req.body);
        const { ruleId, data } = req.body;

        if (!ruleId) {
            console.error("Missing ruleId in request.");
            return res.status(400).json({ message: "Missing ruleId in the request." });
        }

        if (!data || typeof data !== 'object') {
            console.error("Invalid or missing data in request:", data);
            return res.status(400).json({ message: "Invalid or missing data in the request." });
        }

        const result = await evaluateRule(ruleId, data);
        res.json({ result });
    } catch (error) {
        console.error("Error in evaluating rule:", error);
        res.status(500).json({ message: "Error evaluating rule.", error: error.message });
    }
});


module.exports = router;
