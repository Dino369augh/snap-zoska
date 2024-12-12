"use client"; // This marks the component as a client component

import * as React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Head from 'next/head'; // Import Head for client-side metadata

export default function SignOut() {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: '/' }); // Log out and redirect to home
  };

  return (
    <>
      <Head>
        <title>Odhlásenie | ZoškaSnap</title>
      </Head>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h4">Odhlásenie</Typography>
        
        {session ? (
          <>
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Odhlásiť sa
            </Button>
            <p>Dovidenia</p>
          </>
        ) : (
          <Typography variant="body1">Nie ste prihlásený.</Typography>
        )}

        {/* Example Link */}
        <div>
          <Typography variant="body2">
          </Typography>
        </div>
      </div>
    </>
  );
}
