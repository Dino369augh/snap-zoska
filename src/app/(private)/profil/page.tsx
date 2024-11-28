// src/app/profil/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/authOptions";
import AuthHomeView from "@/sections/AuthHomeView";
import Typography from '@mui/material/Typography';

export const metadata = { title: "Zoznam profilov | ZoškaSnap" };

export default async function Profile() {
  // Fetch session on the server
  const session = await getServerSession(authOptions);

  // Conditionally render authenticated or non-authenticated content
  if (session) {
    // Render the authenticated view
    return <AuthHomeView session={session} />;
  }

  // If no session exists (user not logged in), show an error message or redirect
  return (
    <Typography>
      
    </Typography>
  );
}
