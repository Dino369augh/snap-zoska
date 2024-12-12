// src/context/ThemeProvider.tsx
import React, { useState } from 'react';
import { ThemeProvider as MUIThemeProvider, Theme } from '@mui/material/styles'; // Import Theme from MUI
import { ThemeContext } from './ThemeContext'; // Your context
import { defaultTheme, darkTheme } from '../styles/theme';  // Import themes directly

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Set the initial theme to defaultTheme (light mode)
  const [theme, setTheme] = useState<Theme>(defaultTheme);

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
