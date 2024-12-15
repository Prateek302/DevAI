import React, { useState } from "react";

const History = ({ history }) => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <aside
      className={`${
        showHistory ? "block" : "hidden"
      } md:block w-full md:w-1/4 bg-gray-100 dark:bg-gray-700 p-4 my-3 rounded-lg ml-2`}
    >
      <h2 className="text-lg font-medium mb-4 text-black dark:text-white">History</h2>
      <ul>
        {history.map((item, index) => (
          <li
            key={index}
            className="p-2 mb-2 bg-gray-200 dark:bg-gray-700 rounded text-black dark:text-white"
          >
            {item.command}
          </li>
        ))}
      </ul>
      <button
        className="md:hidden mt-4 p-2 w-full bg-blue-500 text-black dark:text-white rounded"
        onClick={() => setShowHistory(!showHistory)}
      >
        {showHistory ? "Hide History" : "Show History"}
      </button>
    </aside>
  );
};

export default History;
