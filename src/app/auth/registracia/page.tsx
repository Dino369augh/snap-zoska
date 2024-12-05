"use client"; // This marks the component as a client component

import { Button, Box, Link, Typography } from '@mui/material'; // Using Material-UI for a styled button
import { signIn } from 'next-auth/react';
import NextLink from 'next/link'; // Import Next.js Link component for routing
import { useTheme } from '@/context/ThemeContext'; // Import the useTheme hook to access the current theme

const LoginPage = () => {
  const { theme } = useTheme(); // Access the current theme from the context
  
  const handleGoogleLogin = async () => {
    // Call the signIn function from next-auth with Google provider
    await signIn('google', {});
  };

  const handleGitHubLogin = async () => {
    // Call the signIn function from next-auth with GitHub provider
    await signIn('github', {});
  };

  return (
    <Box
      sx={{
        display: 'flex',            // Enable flexbox
        justifyContent: 'center',   // Center horizontally
        alignItems: 'center',       // Center vertically
        minHeight: '100vh',          // Full height of the viewport
        backgroundColor: theme.background, // Set the background color based on the theme
      }}
    >
      <Box
        sx={{
          padding: '40px',
          border: `1px solid ${theme.background === "#121212" ? '#444' : '#ccc'}`, // Border color based on dark/light theme
          borderRadius: '8px',
          backgroundColor: theme.background === "#121212" ? '#333' : '#fff',  // Change background of the box based on theme
          boxShadow: 3,             // Add some shadow for better visual appearance
          textAlign: 'center',      // Center the text inside the box
          width: '100%',
          maxWidth: '400px',        // Max width to keep it responsive
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: '20px', color: theme.text }}>Register</Typography>

        {/* Redirect link to /register */}
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="body2" color={theme.text}>
            máte účet?{' '}
            <Link
              component={NextLink}
              href="/auth/prihlasenie"
              passHref
              sx={{ textDecoration: 'none', color: '#1976d2' }}
            >
              Kliknite sem
            </Link>
          </Typography>
        </Box>

        {/* Google Login Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoogleLogin}
          sx={{
            marginTop: '20px', // Space between buttons
            width: '100%',      // Make the buttons take full width for a better look
            backgroundColor: theme.background === "#121212" ? '#1a73e8' : '#1976d2', // Adjust button color based on theme
            color: theme.background === "#121212" ? '#fff' : '#fff', // Button text color
          }}
        >
          Register with Google
        </Button>

        {/* GitHub Login Button */}
        <Button
          variant="contained"
          color="primary" // Keep the same color as the Google button
          onClick={handleGitHubLogin}
          sx={{
            marginTop: '20px', // Space between buttons
            width: '100%',      // Make the buttons take full width for a better look
            backgroundColor: theme.background === "#121212" ? '#1a73e8' : '#1976d2', // Adjust button color based on theme
            color: theme.background === "#121212" ? '#fff' : '#fff', // Button text color
          }}
        >
          Register with GitHub
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
