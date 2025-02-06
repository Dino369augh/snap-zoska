"use client"; // Client-side rendering

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Session } from "next-auth";
import { Box } from "@mui/material";

export default function AuthHomeView({ session }: { session: Session }) {
  return (
    <Container sx={{ textAlign: "center", marginTop: "20px" }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Avatar
          alt={session?.user?.name || "User"}
          src={session?.user?.image || ""}
          sx={{ width: 80, height: 80 }}
        />
      </Box>

      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Vitajte, {session?.user?.name || "užívateľ"}!
      </Typography>

      <Typography variant="h6" sx={{ mb: 4 }}>
        Ste prihlásený ako {session?.user?.email}.
      </Typography>

      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Zobraziť môj profil
      </Button>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Vždy tu nájdete najnovšie informácie o svojich príspevkoch a aktivitách.
      </Typography>
    </Container>
  );
}
