import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ToggleTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPeferDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPeferDark) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="">
      <button
        onClick={toggleTheme}
        aria-label={`switch to ${theme === "dark" ? "light" : "dark"} mode`}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        {theme === 'dark' ? (<span className="text-yellow-300 text-xl"> <FaSun></FaSun> </span>) : (<span className="text-gray-700 text-xl"> <FaMoon></FaMoon> </span>)}
      </button>
    </div>
  );
};

export default ToggleTheme;