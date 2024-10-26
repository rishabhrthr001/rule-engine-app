import React, { useEffect, useState } from 'react';

const RulesList = () => {
  const [rules, setRules] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRule, setExpandedRule] = useState(null); 
  const rulesPerPage = 10; 

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/rules');
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setRules(data);
    } catch (error) {
      console.error('Error fetching rules:', error);
    }
  };

  const indexOfLastRule = currentPage * rulesPerPage;
  const indexOfFirstRule = indexOfLastRule - rulesPerPage;
  const currentRules = rules.slice(indexOfFirstRule, indexOfLastRule);

  const nextPage = () => {
    if (currentPage < Math.ceil(rules.length / rulesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleStructure = (ruleId) => {
    setExpandedRule(expandedRule === ruleId ? null : ruleId); 
  };

  return (
    <div className="flex flex-col p-4">
      <h2 className="text-lg font-bold mb-4">Rules List</h2>
      <div className="mb-4">
        {currentRules.map((rule) => (
          <div key={rule._id} className="mb-2 p-2 border rounded">
            <div>
              <strong>Rule ID:</strong> {rule._id}
            </div>
            <div>
              <strong>Rule:</strong> {rule.ruleName}
            </div>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded mt-2 hover:bg-green-600" 
              onClick={() => toggleStructure(rule._id)}
            >
              {expandedRule === rule._id ? 'Hide Structure' : 'Show Structure'}
            </button>
            {expandedRule === rule._id && (
              <div className="mt-2 p-2 border rounded bg-gray-100">
                <strong>Structure:</strong>
                <pre>{JSON.stringify(rule.rootNode, null, 2)}</pre> 
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          onClick={nextPage}
          disabled={currentPage >= Math.ceil(rules.length / rulesPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RulesList;
