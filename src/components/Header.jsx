import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"; // Import Heroicons

const Header = ({ darkMode, setDarkMode, selectedLanguage, setSelectedLanguage }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-200 dark:bg-gray-700 text-black dark:text-white mx-2 mt-2 rounded-lg">
      <div className="text-lg md:text-xl font-bold">Developers AI</div>
      <div className="flex items-center gap-2 md:gap-4">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="p-2 rounded bg-white dark:bg-gray-900 text-sm md:text-base"
        >
          <option value="React">React</option>
          <option value="JavaScript">JavaScript</option>
          <option value="TypeScript">TypeScript</option>
          <option value="Python">Python</option>
        </select>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded bg-gray-100 dark:bg-gray-900 text-sm md:text-base flex items-center gap-2"
          aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? (
            <SunIcon className="h-5 w-5 text-yellow-500" /> // Light mode icon
          ) : (
            <MoonIcon className="h-5 w-5 text-black-500" /> // Dark mode icon
          )}
          {/* Optional: Uncomment this to display the mode name */}
          {/* <span>{darkMode ? "Light Mode" : "Dark Mode"}</span> */}
        </button>
      </div>
    </header>
  );
};

export default Header;
