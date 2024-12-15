import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard"; // Correct import
import { FiCopy } from "react-icons/fi"; // Copy icon

const Output = ({ output }) => {
  const [copied, setCopied] = useState(false);

  // Function to reset the copy state after a short delay
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="flex-1 p-4 bg-white dark:bg-gray-900 overflow-auto rounded-lg">
      <div className="relative">
        {/* Code Block with <blockquote> <pre> <code> */}
        <blockquote>
          <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-sm md:text-base text-black dark:text-white border border-gray-300 dark:border-gray-600">
            <code>{output || "Generated Code Will Appear Here..."}</code>
          </pre>
        </blockquote>

        {/* Copy Button */}
        <CopyToClipboard text={output || ""} onCopy={handleCopy}>
          <button
            className="absolute top-2 right-2 p-2 bg-gray-200 dark:bg-gray-700 text-sm rounded-md flex items-center gap-1 hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label="Copy to Clipboard"
          >
            <FiCopy className="h-4 w-4 text-gray-700 dark:text-white" />
            <span className="text-xs">{copied ? "Copied!" : "Copy"}</span>
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default Output;
