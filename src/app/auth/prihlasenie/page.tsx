"use client"; // Client-side rendering

import { Button, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import Head from "next/head"; // For client-side metadata
import Link from "next/link"; // Correct import for Link

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    await signIn("google", {});
  };

  const handleGitHubLogin = async () => {
    await signIn("github", {});
  };

  return (
    <>
      <Head>
        <title>Prihlásenie | ZoškaSnap</title>
      </Head>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Prihlásenie
        </Typography>

        {/* Login Buttons */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoogleLogin}
          sx={{ marginTop: "20px", width: "100%" }}
        >
          Prihlásiť sa cez Google
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleGitHubLogin}
          sx={{ marginTop: "20px", width: "100%" }}
        >
          Prihlásiť sa cez GitHub
        </Button>

        <div style={{ marginTop: "20px" }}>
          <Typography variant="body2">
            Nemáte účet?{" "}
            <Link href="/auth/registracia" passHref>
              <Button
                variant="text"
                sx={{
                  color: "#1976d2", // Blue color
                  fontWeight: "bold", // Bold text
                  padding: 0,
                }}
              >
                Zaregistrujte sa
              </Button>
            </Link>
          </Typography>
        </div>
      </div>
    </>
  );
}
