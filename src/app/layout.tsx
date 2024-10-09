import type { Metadata } from "next";
import "./globals.css";
import Navbar from '../components/Navbar'; // Adjust the import path as needed

export const metadata: Metadata = {
  title: "SnapZoška",
  description: "Ja Filip som toto spravil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body> 
        {children}
        <Navbar /> {/* Include the Navbar here */}
      </body>
    </html>
  );
}
