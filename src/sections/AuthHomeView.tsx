// src/sections/AuthHomeView.tsx
"use client";

import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/react';

const AuthHomeView = () => {
  const { data: session } = useSession();

  return (
    <Typography variant="h4">
      Welcome, {session?.user?.name}!
    </Typography>
  );
};

export default AuthHomeView;
