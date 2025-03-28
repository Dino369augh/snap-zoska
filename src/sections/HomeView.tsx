
"use client"; 

import { useSession } from 'next-auth/react'; 
import Typography from '@mui/material/Typography'; 

export default function Home() {
  const { data: session, status } = useSession(); 


  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  }


  return (
    <Typography>
      {session ? `Welcome, ${session.user?.name}` : 'Welcome guest'}
    </Typography>
  );
}
