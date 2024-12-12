"use client";

import { Button, Box, Link, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { signIn } from 'next-auth/react';
import NextLink from 'next/link';
import { useState } from 'react';

const RegisterPage = () => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleGoogleLogin = async () => {
    if (isAgreed) {
      await signIn("google", {});
    } else {
      alert("Musíte súhlasiť s GDPR a podmienkami služby, aby ste pokračovali.");
    }
  };

  const handleGitHubLogin = async () => {
    if (isAgreed) {
      await signIn("github", {});
    } else {
      alert("Musíte súhlasiť s GDPR a podmienkami služby, aby ste pokračovali.");
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          padding: '40px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          textAlign: 'center',
          width: '100%',
          maxWidth: '400px',
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Registrácia
        </Typography>

        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="body2">
            Máte už účet?{' '}
            <Link
              component={NextLink}
              href="/auth/prihlasenie"
              passHref
              sx={{
                textDecoration: 'none',
                color: '#1976d2', // Set the color to blue like the GDPR and Terms of Service links
                fontWeight: 'bold', // Make the text bold
              }}
            >
              Kliknite sem
            </Link>
          </Typography>
        </Box>

        {/* GDPR Checkbox */}
        <Box sx={{ marginBottom: '20px', textAlign: 'left' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                sx={{ color: 'text.primary' }} // Uses theme's text color
              />
            }
            label={
              <Typography variant="body2">
                Súhlas s {' '}
                <Link
                  component={NextLink}
                  href="/gdpr"
                  passHref
                  sx={{
                    textDecoration: 'none',
                    color: '#1976d2',
                    fontWeight: 'bold', // Make the GDPR text bold
                  }}
                >
                  GDPR
                </Link>{' '}
                a{' '}
                <Link
                  component={NextLink}
                  href="/podmienky"
                  passHref
                  sx={{
                    textDecoration: 'none',
                    color: '#1976d2',
                    fontWeight: 'bold', // Make the Podmienky text bold
                  }}
                >
                  Podmienkami služby
                </Link>
              </Typography>
            }
          />
        </Box>

        {/* Register Buttons */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoogleLogin}
          sx={{ marginTop: '20px', width: '100%' }}
        >
          Registrovať sa cez Google
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleGitHubLogin}
          sx={{ marginTop: '20px', width: '100%' }}
        >
          Registrovať sa cez GitHub
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterPage;
