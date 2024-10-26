function evaluateASTNode(node, data) {
    if (!node || !node.type) {
        console.error("Invalid AST Node:", node);
        throw new Error("Invalid AST Node");
    }

    console.log("Evaluating Node:", node);

    switch (node.type) {
        case 'operand':
            return evaluateOperand(node, data);
        case 'AND':
            const leftAnd = evaluateASTNode(node.left, data);
            const rightAnd = evaluateASTNode(node.right, data);
            console.log(`AND evaluation: ${leftAnd} AND ${rightAnd}`);
            return leftAnd && rightAnd;
        case 'OR':
            const leftOr = evaluateASTNode(node.left, data);
            const rightOr = evaluateASTNode(node.right, data);
            console.log(`OR evaluation: ${leftOr} OR ${rightOr}`);
            return leftOr || rightOr;
        default:
            console.error(`Unknown AST node type: ${node.type}`);
            throw new Error(`Unknown AST node type: ${node.type}`);
    }
}


function evaluateOperand(node, data) {
    const field = node.value; // e.g., "age", "salary"
    console.log(`Evaluating Operand: field = ${field}, data[field] = ${data[field]}`);
    
    return data.hasOwnProperty(field) && data[field] !== null && data[field] !== undefined;
}

// Main function to evaluate the rule based on ruleId and data
async function evaluateRule(ruleId, data) {
    try {
        const rule = await RuleModel.findById(ruleId);
        if (!rule) {
            throw new Error("Rule not found");
        }

        console.log("Rule Found:", rule);
        const result = evaluateASTNode(rule.rootNode, data);
        return result;
    } catch (error) {
        console.error("Error evaluating rule:", error);
        throw error;
    }
}

module.exports = evaluateRule;
