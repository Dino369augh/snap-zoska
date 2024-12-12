// src/context/ThemeContext.tsx
import { createContext, useContext } from 'react';
import { Theme } from '@mui/material/styles';  // Use the MUI Theme type if needed
export type ThemeContextType = {
  theme: Theme;      // Ensure the theme type is correct
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
