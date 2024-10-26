const create_rule = require('./create_rule');

// Helper function to deeply compare two AST nodes for equality
function areASTNodesEqual(node1, node2) {
    if (node1.type !== node2.type) return false;

    // For 'operand' nodes, compare their values
    if (node1.type === 'operand') {
        return node1.value === node2.value;
    }

    // Recursively check left and right children
    return areASTNodesEqual(node1.left, node2.left) && areASTNodesEqual(node1.right, node2.right);
}

function combine_rules(rules, operator = 'AND') {
    // Validate the input rules
    if (!Array.isArray(rules) || rules.length === 0) {
        console.error("No rules provided for combining.");
        return null; 
    }

    // Extract valid root nodes from rules
    const astList = rules.map(rule => {
        if (rule && rule.rootNode) {
            return rule.rootNode; // Return the rootNode if valid
        } else {
            console.error("Rule does not have a valid rootNode:", rule);
            return null; // Return null for invalid rules
        }
    }).filter(ast => ast !== null); // Filter out invalid ASTs

    // Check if there are any valid ASTs to combine
    if (astList.length === 0) {
        console.error("No valid root nodes found.");
        return null; 
    }

    // If only one valid AST exists, return it
    if (astList.length === 1) {
        return astList[0]; 
    }

    // Start combining the ASTs
    let combinedAST = astList[0];

    for (let i = 1; i < astList.length; i++) {
        const currentAST = astList[i];

        // Skip combining if the nodes are equal
        if (areASTNodesEqual(combinedAST, currentAST)) {
            continue; 
        }

        // Create a new combined AST using the specified operator
        combinedAST = {
            type: operator,
            left: combinedAST,
            right: currentAST,
        };
    }

    return combinedAST; 
}

module.exports = combine_rules;
