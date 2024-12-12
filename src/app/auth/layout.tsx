"use client"; // Client-side rendering

import { Box } from "@mui/material";
import { ReactNode } from "react"; // For defining children in the layout

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px", // added padding around the layout to avoid full-width display
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
        {children}  {/* Children will be injected here */}
      </Box>
    </Box>
  );
};

export default AuthLayout;
