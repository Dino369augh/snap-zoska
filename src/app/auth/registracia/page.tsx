"use client"; // Client-side rendering

import { Button, Typography, Checkbox, FormControlLabel, Alert } from "@mui/material";
import { signIn } from "next-auth/react";
import Head from "next/head"; // For client-side metadata
import Link from "next/link"; // Correct import for Link
import { useState } from "react";

export default function RegisterPage() {
  const [isAgreed, setIsAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleGoogleLogin = async () => {
    if (isAgreed) {
      await signIn("google", {});
    } else {
      setErrorMessage("Musíte súhlasiť s GDPR a podmienkami služby, aby ste pokračovali.");
    }
  };

  const handleGitHubLogin = async () => {
    if (isAgreed) {
      await signIn("github", {});
    } else {
      setErrorMessage("Musíte súhlasiť s GDPR a podmienkami služby, aby ste pokračovali.");
    }
  };

  return (
    <>
      <Head>
        <title>Registrácia | ZoškaSnap</title>
      </Head>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Registrácia
        </Typography>

        {/* Show Alert if there is an error message */}
        {errorMessage && (
          <Alert severity="error" sx={{ marginBottom: "20px" }}>
            {errorMessage}
          </Alert>
        )}

        {/* GDPR Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              sx={{ color: "text.primary" }} // Uses theme's text color
            />
          }
          label={
            <Typography variant="body2">
              Súhlasím s{" "}
              <Link href="/gdpr" passHref>
                <Button
                  variant="text"
                  sx={{
                    color: "#1976d2", // Blue color
                    fontWeight: "bold", // Bold text
                    padding: 0,
                  }}
                >
                  GDPR
                </Button>
              </Link>{" "}
              a{" "}
              <Link href="/podmienky" passHref>
                <Button
                  variant="text"
                  sx={{
                    color: "#1976d2", // Blue color
                    fontWeight: "bold", // Bold text
                    padding: 0,
                  }}
                >
                  Podmienkami
                </Button>
              </Link>
            </Typography>
          }
          sx={{ textAlign: "left" }}
        />

        {/* Register Buttons */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoogleLogin}
          sx={{ marginTop: "20px", width: "100%" }}
        >
          Registrovať sa cez Google
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleGitHubLogin}
          sx={{ marginTop: "20px", width: "100%" }}
        >
          Registrovať sa cez GitHub
        </Button>

        <div style={{ marginTop: "20px" }}>
          <Typography variant="body2">
            Už máte účet?{" "}
            <Link href="/auth/prihlasenie" passHref>
              <Button
                variant="text"
                sx={{
                  color: "#1976d2", // Blue color
                  fontWeight: "bold", // Bold text
                  padding: 0,
                }}
              >
                Prihláste sa
              </Button>
            </Link>
          </Typography>
        </div>
      </div>
    </>
  );
}
