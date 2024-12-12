"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/context/ThemeProvider"; // Custom ThemeProvider
import { CssBaseline } from "@mui/material"; // Reset CSS for consistent styling
import Navbar from "@/components/NavBar";
import AuthProvider from "@/components/AuthProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sk">
      <body style={{ margin: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <ThemeProvider> {/* Ensure ThemeProvider is wrapping everything */}
          <CssBaseline /> {/* Reset CSS */}
          <AuthProvider>
            <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
              <main
                style={{
                  flexGrow: 1,
                  paddingBottom: "80px", // Prevent content from being obscured by Navbar
                  overflowY: "auto", // Allow scrolling inside the main content area if necessary
                }}
              >
                {children}
              </main>
              <Navbar /> {/* Fixed Navbar at the bottom */}
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
