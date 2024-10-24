// src/app/auth/prihlasenie/page.tsx
"use client"; // This marks the component as a client component

import { signIn } from 'next-auth/react';
import { Button } from '@mui/material'; // Using Material-UI for a styled button

const LoginPage = () => {
  const handleGoogleLogin = async () => {
    // Call the signIn function from next-auth with Google provider
    const result = await signIn('google', {

    });
  };

  return (
    <div>
      <h1>Login</h1>
      <Button variant="contained" color="primary" onClick={handleGoogleLogin}>
        Login with Google
      </Button>
    </div>
  );
};

export default LoginPage;
