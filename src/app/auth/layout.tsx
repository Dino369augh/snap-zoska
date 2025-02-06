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
        height: "100dvh", // Uses dynamic viewport height to prevent overflow issues
        padding: 0, // Removes extra spacing that might cause scrolling
        margin: 0, // Ensures no extra margins
        overflow: "hidden", // Hides any potential overflow causing a scrollbar
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
          backgroundColor: "background.paper",
        }}
      >
        {children} {/* Children will be injected here */}
      </Box>
    </Box>
  );
};

export default AuthLayout;
