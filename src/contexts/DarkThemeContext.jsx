import React, { useState, useEffect, useContext, createContext } from "react";

// Constants
export const DARK_THEME_STORAGE = "darkTheme"; // storage key

// Context
const DarkThemeContext = createContext({});

// useContext hook
export const useDarkThemeContext = () => useContext(DarkThemeContext);

// Provider
export const DarkThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DARK_THEME_STORAGE) !== null) {
      //   Found existing DARK_THEME_STORAGE
      const retrievedData = localStorage.getItem(DARK_THEME_STORAGE);
      const parsedBool = retrievedData === "true"; // Safely parses string to bool

      setIsDark(parsedBool);
    } else {
      // Found none, set new value to DARK_THEME_STORAGE
      localStorage.setItem(DARK_THEME_STORAGE, false);
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    if (isDark === true) {
      document.body.classList.add("dark");
      localStorage.setItem(DARK_THEME_STORAGE, isDark);
    } else if (isDark === false) {
      document.body.classList.remove("dark");
      localStorage.setItem(DARK_THEME_STORAGE, isDark);
    }
  }, [isDark]);

  const value = {
    isDark,
    setIsDark,
  };

  return (
    <DarkThemeContext.Provider value={value}>
      {children}
    </DarkThemeContext.Provider>
  );
};
