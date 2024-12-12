"use client"; // Client-side rendering

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Session } from "next-auth";

export default function AuthHomeView({ session }: { session: Session }) {
  return (
    <Container sx={{ textAlign: "center", marginTop: "20px" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Vitajte, {session?.user?.name || "užívateľ"}!
      </Typography>
      
      <Typography variant="h6" sx={{ mb: 2 }}>
        Ste prihlásený ako {session?.user?.email}.
      </Typography>
    </Container>
  );
}
