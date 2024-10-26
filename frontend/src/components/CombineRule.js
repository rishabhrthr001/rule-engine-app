import React, { useState } from "react";
import { toast } from "react-toastify";

const CombineRules = ({ setResult }) => {
  const [combinedRules, setCombinedRules] = useState("");
  const [combinedAST, setCombinedAST] = useState(null); // State to hold the combined AST

  const handleCombineRules = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/rules/combine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ruleIds: combinedRules.split(",").map(id => id.trim()) }),
      });

      const textResponse = await response.text();
      let data;

      try {
        data = JSON.parse(textResponse); // Try parsing it to JSON
      } catch (error) {
        console.error("Response is not valid JSON:", textResponse);
        throw new Error("Response is not valid JSON");
      }

      console.log("API Response:", data);

      if (response.ok) {
        toast.success("Rules combined successfully!");
        setCombinedAST(data.rootNode); // Assuming the rootNode exists in the response
        setResult(data.rootNode);
      } else {
        toast.error("Error combining rules: " + (data.error || textResponse));
      }
    } catch (error) {
      toast.error("Error combining rules: " + error.message);
      console.error("Error combining rules:", error);
    }
  };

  console.log("Combined AST State:", combinedAST);

  return (
    <div>
      <textarea
        className="w-full max-w-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 resize-none"
        value={combinedRules}
        onChange={(e) => setCombinedRules(e.target.value)}
        placeholder="Enter rule IDs separated by commas"
        rows={2}
      />
      <button
        className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        onClick={handleCombineRules}
      >
        Combine
      </button>

      {combinedAST && ( // Display the combined AST if it exists
        <div className="mt-4 p-2 border border-gray-300 rounded-lg">
          <h3 className="font-bold">Combined AST (Root Node):</h3>
          <pre className="whitespace-pre-wrap">{JSON.stringify(combinedAST, null, 2)}</pre> {/* Display AST nicely formatted */}
        </div>
      )}
    </div>
  );
};

export default CombineRules;
