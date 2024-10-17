"use client"; // This marks the component as a client component

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout'; // Import Logout icon

// Define unauthenticated paths
const unauthPaths = [
  { label: "Domov", icon: <HomeIcon />, path: '/' },
  { label: "Prihlásenie", icon: <LoginIcon />, path: '/auth/prihlasenie' },
  { label: "Registrácia", icon: <AppRegistrationIcon />, path: '/auth/registracia' },
];

// Define authenticated paths
const authPaths = [
  { label: "Domov", icon: <HomeIcon />, path: '/' },
  { label: "Profily", icon: <PersonIcon />, path: '/profil' },
  { label: "Príspevky", icon: <PostAddIcon />, path: '/prispevok' },
];

export default function Navbar() {
  const { data: session } = useSession(); // Get session data
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  const handleLogout = () => {
    signOut({ callbackUrl: '/' }); // Log out and redirect to home
  };

  // Determine navigation items based on session state
  const navItems = session ? authPaths : unauthPaths;

  // Create the navigation actions based on session state
  const navActions = session 
    ? [
      <BottomNavigationAction
        key="logout" // Add a key for the logout action
        label="Odhlásiť sa" // Logout label
        icon={<LogoutIcon />} // Logout icon
        onClick={handleLogout} // Call the logout function
      />
    ] 
    : null; // No action for unauthenticated users

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {navItems.map((item, index) => (
          <BottomNavigationAction 
            key={index}
            label={item.label} 
            icon={item.icon} 
            onClick={() => router.push(item.path)} 
          />
        ))}

        {/* Render the logout action for authenticated users */}
        {navActions} {/* This is now an array */}
      </BottomNavigation>
    </Box>
  );
}
