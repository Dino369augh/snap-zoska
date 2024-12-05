// src/context/ThemeContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for our theme context
type ThemeContextType = {
  theme: { background: string; text: string };
  toggleTheme: () => void;
};

// Default theme with grey background and green text (Light Mode)
const defaultTheme = {
  background: "#f0f0f0",  // Light mode background (whiteish grey)
  text: "#4caf50",        // Green text
};

// Dark mode theme
const darkTheme = {
  background: "#121212",  // Dark background
  text: "#ffffff",        // White text
};

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(defaultTheme); // Set default to light theme

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme.background === "#121212" ? defaultTheme : darkTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{ backgroundColor: theme.background, color: theme.text, minHeight: "100vh" }}>
        {children}
      </div>
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
