import React, { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import History from "./components/History.jsx";
import Output from "./components/Output.jsx";
import Input from "./components/Input.jsx";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("React"); // Default language is React
  const [history, setHistory] = useState([]);
  const [output, setOutput] = useState("");

  console.log('VITE_API_URL:', import.meta.env.VITE_API_URL_OpenAI);
  console.log('mode',import.meta.env.MODE);  // This will tell you if you're in 'development' or 'production' mode


  const handleGenerate = (command) => {
    if (!command.trim()) return;

    // Mock API Call (replace with actual backend call)
    let generatedCode = `${selectedLanguage} code for: ${command}`;

    setOutput(generatedCode);

    // Update history
    setHistory([...history, { command, output: generatedCode }]);
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
       

        <div className="flex flex-1 flex-col md:flex-row bg-white dark:bg-gray-900">
          <History history={history} />
          <div className="flex-1 flex flex-col">
            <Output output={output} />
            <Input onGenerate={handleGenerate} output={output} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
