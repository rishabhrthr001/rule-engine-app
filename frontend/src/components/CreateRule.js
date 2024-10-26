import React, { useState } from 'react';
import axios from 'axios';
import Result from './Result'; // Import the Result component

const CreateRule = () => {
  const [ruleString, setRuleString] = useState('');
  const [astResult, setAstResult] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setRuleString(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/rules', { ruleString });
      setAstResult(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Error creating rule. Please check the input format.');
      setAstResult(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={ruleString}
          onChange={handleInputChange}
          placeholder="Enter your rule string here"
          rows="4"
          cols="50"
          required
          className="w-full h-24 p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-2">
          Create AST
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {astResult && (
        <div className="mt-4">
          <Result result={astResult} />  {/* Pass the result to the Result component */}
        </div>
      )}
    </div>
  );
};

export default CreateRule;
