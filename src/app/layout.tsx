"use client"; // This marks the component as a client component

import { ReactNode } from "react";
import { ThemeProvider } from "@/context/ThemeContext"; // Import the ThemeProvider
import Navbar from "@/components/NavBar"; // Import Navbar component
import AuthProvider from "@/components/AuthProvider"; // Assuming you have an AuthProvider

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sk" style={{ height: '100%' }}>
      <body style={{ height: '100%', margin: 0 }}>
        <ThemeProvider> {/* Wrap your app with ThemeProvider */}
          <AuthProvider>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <main style={{ flexGrow: 1, paddingBottom: '80px' }}> {/* Add padding bottom for Navbar height */}
                {children} {/* Render children inside */}
              </main>
              <Navbar /> {/* Navbar component fixed at the bottom */}
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
