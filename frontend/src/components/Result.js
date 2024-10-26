import React from "react";

const Result = ({ result }) => {
  return (
    <div className="flex flex-col">
      <h3 className="font-bold mb-2">Result:</h3>
      <textarea
        readOnly
        value={JSON.stringify(result, null, 2)}
        className="bg-gray-100 p-4 rounded border border-gray-300 w-[100px] h-[100px] resize-none overflow-auto"
      />
    </div>
  );
};

export default Result;
