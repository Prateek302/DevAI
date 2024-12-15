import React, { useState } from "react";
import { FiSend } from "react-icons/fi"; // Send Icon
import { IoReloadCircleOutline } from "react-icons/io5"; // Regenerate Icon

const Input = ({ onGenerate, output, selectedLanguage }) => {
  const [command, setCommand] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!command.trim()) return;

    const apiKey = import.meta.env.VITE_API_KEY_Gemini;  // Ensure API key is correct
    const apiUrl = import.meta.env.VITE_API_URL_Gemini;  // Ensure API URL is correct

    // Add the selected language to the command
    const updatedCommand = `${command} in ${selectedLanguage} language`;

    const API = `${apiUrl}${apiKey}`;  // Ensure this is the correct way to call Gemini API with the key

    if (!apiKey) {
      console.error("API key is missing! Ensure your .env file is correctly set up.");
      onGenerate("API key is missing. Please check your configuration.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [{ text: updatedCommand }]  // Send the updated command with language information
          }],
          language: selectedLanguage // Pass the selected language to the API
        })
      });

      const data = await response.json();
      console.log("API Response Data:", data); // Log the response for debugging

      // Adjusting for the Gemini response structure with 'candidates'
      if (response.ok && data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts.length > 0) {
        onGenerate(data.candidates[0].content.parts[0].text.trim());  // Return the generated response
      } else {
        console.error("Error from API:", data);
        onGenerate("Error generating output. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching API:", error);
      onGenerate("Error generating output. Please try again.");
    } finally {
      setIsLoading(false);
      setCommand("");  // Clear the input after submission
    }
  };

  const handleRegenerate = async () => {
    if (!output) return;
    await handleSubmit(); // Regenerate the response
  };

  return (
    <div className="px-4 my-3 pt-2 pb-1 rounded-lg bg-gray-200 dark:bg-gray-900 mx-3">
      <div className="relative">
        <textarea
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-sm md:text-base text-black dark:text-white"
          placeholder="Enter your command..."
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          className={`absolute right-4 top-2 p-2 rounded bg-green-700 text-white text-lg md:text-xl dark:bg-blue-700 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : <FiSend />}
        </button>
        {output && (
          <button
            onClick={handleRegenerate}
            className="absolute right-2 top-2 p-2 rounded bg-gray-300 dark:bg-gray-600 text-lg md:text-xl"
            disabled={isLoading}
          >
            <IoReloadCircleOutline />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
