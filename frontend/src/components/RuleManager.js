// RuleManager.js
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import CreateRule from "./CreateRule";
import CombineRules from "./CombineRule";
import EvaluateRule from "./EvaluateRule";
import Result from "./Result";
import RulesList from "./RulesList"; // Import the RulesList component
import "react-toastify/dist/ReactToastify.css";

const RuleManager = () => {
  const [result, setResult] = useState("");
  const [showCreateRule, setShowCreateRule] = useState(false);
  const [showCombineRules, setShowCombineRules] = useState(false);
  const [showEvaluateRule, setShowEvaluateRule] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rulesPerPage = 10; // Number of rules to show per page

  return (
    <div className="flex">
      {/* Left Side: Rule Management */}
      <div className="flex flex-col items-start m-8 w-1/2">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick draggable pauseOnHover />

        <div className="mb-6">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => setShowCreateRule(!showCreateRule)}
          >
            Create Rule
          </button>
          {showCreateRule && <CreateRule />}
        </div>

        <div className="mb-6">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => setShowCombineRules(!showCombineRules)}
          >
            Combine Rules
          </button>
          {showCombineRules && <CombineRules setResult={setResult} />}
        </div>

        <div className="mb-6">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => setShowEvaluateRule(!showEvaluateRule)}
          >
            Evaluate Rule
          </button>
          {showEvaluateRule && <EvaluateRule setResult={setResult} />}
        </div>

        <Result result={result} />
      </div>

      <div className="w-1/2 border-l border-gray-300 pl-8">
        <RulesList currentPage={currentPage} setCurrentPage={setCurrentPage} rulesPerPage={rulesPerPage} />
      </div>
    </div>
  );
};

export default RuleManager;
