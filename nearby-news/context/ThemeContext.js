import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = isDarkMode ? {
    background: "#121212",
    card: "#1E1E1E",
    text: "#FFFFFF",
    subtext: "#B0B0B0",
    border: "#333333",
    modalBg: "#1E1E1E",
    tabBar: "#1E1E1E",
    tabBarBorder: "#333333",
  } : {
    background: "#f5f5f5",
    card: "#fff",
    text: "#333",
    subtext: "#666",
    border: "#e0e0e0",
    modalBg: "#fff",
    tabBar: "#fff",
    tabBarBorder: "#e0e0e0",
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
