// src/app/(home)/Home.tsx
"use client"; // Mark this as a client component

import { useSession } from 'next-auth/react'; // Import the useSession hook
import Typography from '@mui/material/Typography'; // Import Typography component

export default function Home() {
  const { data: session, status } = useSession(); // Use the session hook

  // While loading the session data, show a loading indicator
  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  }

  // Render the welcome message based on session state
  return (
    <Typography>
      {session ? `Welcome, ${session.user?.name}` : 'Welcome guest'}
    </Typography>
  );
}
