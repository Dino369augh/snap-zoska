import React, { useState, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider, Theme } from '@mui/material/styles';
import { ThemeContext } from './ThemeContext';
import { defaultTheme, darkTheme } from '../styles/theme';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Read the theme from localStorage or default to light mode
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    // Check if window is defined (i.e., we're in the browser)
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      setTheme(savedTheme === 'dark' ? darkTheme : defaultTheme);
    }
  }, []);

  // Update localStorage whenever the theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme.palette.mode);
    }
  }, [theme]);

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme.palette.mode === 'dark' ? defaultTheme : darkTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};