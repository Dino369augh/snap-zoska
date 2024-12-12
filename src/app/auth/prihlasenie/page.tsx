"use client";

import { Button, Box, Link, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import NextLink from "next/link";

const LoginPage = () => {
  const handleGoogleLogin = async () => {
    await signIn("google", {});
  };

  const handleGitHubLogin = async () => {
    await signIn("github", {});
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          padding: "40px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          textAlign: "center",
          width: "100%",
          maxWidth: "400px",
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Prihlásenie
        </Typography>

        <Box sx={{ marginBottom: "20px" }}>
          <Typography variant="body2">
            Nemáte účet?{" "}
            <Link
              component={NextLink}
              href="/auth/registracia"
              passHref
              sx={{
                textDecoration: "none",
                color: "#1976d2", // Blue color like GDPR link
                fontWeight: "bold", // Make the text bold
              }}
            >
              Kliknite sem
            </Link>
          </Typography>
        </Box>

        {/* Google Login Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoogleLogin}
          sx={{ marginTop: "20px", width: "100%" }}
        >
          Prihlásiť sa cez Google
        </Button>

        {/* GitHub Login Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleGitHubLogin}
          sx={{ marginTop: "20px", width: "100%" }}
        >
          Prihlásiť sa cez GitHub
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
