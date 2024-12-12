import { createTheme } from '@mui/material/styles';

export const defaultTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: "#f0f0f0",  // Light mode background (whiteish grey)
    },
    text: {
      primary: "#9c27b0",   // Purple text (instead of green)
    },
    primary: {
      main: "#9c27b0",  // Purple button background (for light mode)
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: "#121212",  // Dark background
    },
    text: {
      primary: "#ffffff",  // White text (remains the same)
    },
    primary: {
      main: "#9c27b0",  // Purple button background (for dark mode)
    },
  },
});
