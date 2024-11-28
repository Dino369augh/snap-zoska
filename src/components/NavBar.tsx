"use client"; // This marks the component as a client component

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info'; // Icon for "O mne" (About Me)
import GavelIcon from '@mui/icons-material/Gavel'; // Icon for "GDPR"

// Define paths for unauthenticated users
const unauthPaths = [
  { label: "Domov", icon: <HomeIcon />, path: '/' },
  { label: "O mne", icon: <InfoIcon />, path: '/o-mne' }, // Add O mne (About Me)
  { label: "GDPR", icon: <GavelIcon />, path: '/gdpr' }, // Add GDPR
  { label: "Prihlásenie", icon: <LoginIcon />, path: '/auth/prihlasenie' },
  { label: "Registrácia", icon: <AppRegistrationIcon />, path: '/auth/registracia' },
];

// Define paths for authenticated users
const authPaths = [
  { label: "Profil", icon: <PersonIcon />, path: '/profil' },
  { label: "Príspevky", icon: <PostAddIcon />, path: '/prispevok' },
  { label: "Odhlásenie", icon: <LogoutIcon />, path: '/auth/odhlasenie' }, 
];

export default function Navbar() {
  const { data: session } = useSession(); 
  const [value, setValue] = React.useState(0);
  const router = useRouter();


  const navItems = session ? authPaths : unauthPaths;

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
      </BottomNavigation>
    </Box>
  );
}
