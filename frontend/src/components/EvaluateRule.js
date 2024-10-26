import React, { useState } from "react";
import { toast } from "react-toastify";

const EvaluateRule = ({ setResult }) => {
  const [evaluatedData, setEvaluatedData] = useState({ ruleId: "", data: "" });

  const handleEvaluateRule = async () => {
    try {
        let parsedData;
        try {
            parsedData = JSON.parse(evaluatedData.data);
        } catch (err) {
            toast.error("Invalid JSON format. Please enter valid JSON data.");
            console.error("Invalid JSON:", err);
            return;
        }

        const response = await fetch("/api/rules/evaluate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ruleId: evaluatedData.ruleId, data: parsedData }),
        });

        const data = await response.json();
        if (response.ok) {
            toast.success("Rule evaluated successfully!");
            setResult(data.result);
        } else {
            toast.error("Error evaluating rule: " + data.message);
        }
    } catch (error) {
        toast.error("Error evaluating rule: " + error.message);
        console.error("Error evaluating rule:", error);
    }
};


  return (
    <div>
      <input
        className="w-full max-w-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        type="text"
        placeholder="Rule ID"
        onChange={(e) => setEvaluatedData({ ...evaluatedData, ruleId: e.target.value })}
      />
      <textarea
        className="w-full max-w-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 resize-none h-48 mt-2"
        onChange={(e) => setEvaluatedData({ ...evaluatedData, data: e.target.value })}
        placeholder='Enter data as JSON, e.g., {"age": 28, "salary": 50000}'
        rows={4}
      />
      <button
        className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        onClick={handleEvaluateRule}
      >
        Evaluate
      </button>
    </div>
  );
};

export default EvaluateRule;
