"use client";
import "./globals.css";

import { ReactNode } from "react";
import { ThemeProvider as CustomThemeProvider } from "@/context/ThemeProvider"; 
import { CssBaseline } from "@mui/material"; 
import Navbar from "@/components/NavBar"; 
import AuthProvider from "@/components/AuthProvider"; 

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sk" style={{ height: "100%" }}> {/* Ensure html takes full height */}
      <body
        style={{
          margin: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CustomThemeProvider>
          <CssBaseline />
          <AuthProvider>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <main
                style={{
                  flexGrow: 1, // Allow content to grow and fill available space
                }}
              >
                {children}
              </main>
              <Navbar /> {/* Navbar is part of layout */}
            </div>
          </AuthProvider>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
