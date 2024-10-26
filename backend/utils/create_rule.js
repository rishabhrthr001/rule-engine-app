class Node {
    constructor(type, value, left = null, right = null) {
        this.type = type; 
        this.value = value; 
        if (left) this.left = left;
        if (right) this.right = right;
    }
}

function create_rule(ruleString) {
    const tokens = ruleString
        .replace(/\(/g, " ( ")
        .replace(/\)/g, " ) ")
        .split(/\s+/)
        .filter(token => token.length);

    function parseExpression(tokens) {
        if (!tokens.length) return null;

        let token = tokens.shift();

        if (token === "(") {
            const leftNode = parseExpression(tokens); 
            const operator = tokens.shift(); 
            const rightNode = parseExpression(tokens); 
            tokens.shift();
            return new Node("operator", operator, leftNode, rightNode);
        }

        const leftOperand = new Node("operand", token);
        
        const comparisonOperator = tokens.shift();
        const rightValue = tokens.shift(); 

        const rightOperand = new Node("operand", rightValue.replace(/'/g, "")); 

        return new Node("operator", comparisonOperator, leftOperand, rightOperand);
    }

    return parseExpression(tokens);
}

const testRule = "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)";
const ast = create_rule(testRule);
console.log(JSON.stringify(ast, null, 2));

module.exports = create_rule;
