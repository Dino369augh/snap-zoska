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
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Icon for dark mode
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Icon for light mode
import { useTheme } from '@/context/ThemeContext'; // Import useTheme to access dark mode toggle

// Define paths for unauthenticated users
const unauthPaths = [
  { label: "Domov", icon: <HomeIcon />, path: '/' },
  { label: "O mne", icon: <InfoIcon />, path: '/o-mne' }, // Add O mne (About Me)
  { label: "Prihlásenie", icon: <LoginIcon />, path: '/auth/prihlasenie' },
  { label: "Registrácia", icon: <AppRegistrationIcon />, path: '/auth/registracia' },
];

// Define paths for authenticated users
const authPaths = [
  { label: "Domov", icon: <HomeIcon />, path: '/' },
  { label: "Profil", icon: <PersonIcon />, path: '/profil' },
  { label: "Príspevky", icon: <PostAddIcon />, path: '/prispevok' },
  { label: "Odhlásenie", icon: <LogoutIcon />, path: '/auth/odhlasenie' },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  // Get the theme and toggle function from the context
  const { theme, toggleTheme } = useTheme();

  const navItems = session ? authPaths : unauthPaths;

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          backgroundColor: theme.palette.mode === 'dark' ? "#333333" : "#ffffff", // Dark mode: grey background, Light mode: white background
          color: theme.palette.text.primary, // Set the icon color based on the theme's text color
          display: 'flex',
          justifyContent: 'center', // Center the icons
          position: 'relative', // Needed for absolute positioning of the dark mode icon
        }}
      >
        {navItems.map((item, index) => (
          <BottomNavigationAction
            key={index}
            label={item.label}
            icon={item.icon}
            onClick={() => router.push(item.path)}
            sx={{
              color: theme.palette.text.primary, // Ensure icon color is updated for unselected icons
              '&.Mui-selected': {
                color: theme.palette.primary.main, // Set selected icon color to purple (primary color)
                transform: 'scale(1.2)', // Increase the size of the selected icon
                transition: 'transform 0.3s ease', // Smooth transition for scale
              },
              '&:hover': {
                color: theme.palette.primary.main, // Highlight icon on hover as well
              }
            }}
          />
        ))}

        {/* Dark Mode Toggle Icon */}
        <BottomNavigationAction
          label=""
          icon={theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          onClick={toggleTheme}
          sx={{
            color: theme.palette.text.primary, // Same color logic as other icons
            '&.Mui-selected': {
              color: theme.palette.primary.main, // Highlighted color for dark mode button
            },
            '&:hover': {
              color: theme.palette.primary.main, // Highlight icon on hover
            },
            marginLeft: 'auto', // Push the dark mode icon to the right
            position: 'absolute', // Position it absolutely within the BottomNavigation
            right: 0, // Align it to the right
            top: '50%', // Position it vertically centered
            transform: 'translateY(-50%)', // Correct vertical centering
          }}
        />
      </BottomNavigation>
    </Box>
  );
}
