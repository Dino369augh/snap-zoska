import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@/context/ThemeContext';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

// Define paths for unauthenticated users
const unauthPaths = [
  { label: "Domov", icon: <HomeIcon />, path: '/' },
  { label: "O mne", icon: <InfoIcon />, path: '/o-mne' },
  { label: "Prihlásenie", icon: <LoginIcon />, path: '/auth/prihlasenie' },
  { label: "Registrácia", icon: <AppRegistrationIcon />, path: '/auth/registracia' },
];

// Define paths for authenticated users
const authPaths = [
  { label: "Domov", icon: <HomeIcon />, path: '/' },
  { label: "Vyhľadať", icon: <SearchIcon />, path: '/hladat' },
  { label: "Príspevky", icon: <PostAddIcon />, path: '/prispevok' },
];

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user as User | undefined;
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Get the theme and toggle function from the context
  const { theme, toggleTheme } = useTheme();

  const navItems = session ? authPaths : unauthPaths;

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    router.push(path);
    handleClose();
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/auth' });
    handleClose();
  };

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          backgroundColor: theme.palette.mode === 'dark' ? "#333333" : "#ffffff",
          color: theme.palette.text.primary,
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {navItems.map((item, index) => (
          <BottomNavigationAction
            key={index}
            label={item.label}
            icon={item.icon}
            onClick={() => router.push(item.path)}
            sx={{
              color: theme.palette.text.primary,
              '&.Mui-selected': {
                color: theme.palette.primary.main,
                transform: 'scale(1.2)',
                transition: 'transform 0.3s ease',
              },
              '&:hover': {
                color: theme.palette.primary.main,
              }
            }}
          />
        ))}

        {session && (
          <BottomNavigationAction
            label="Profil"
            icon={
              <Avatar 
                alt={user?.name || 'User'} 
                src={user?.image || undefined}
                sx={{ width: 24, height: 24 }}
              >
                {!user?.image && (user?.name?.[0] || 'U')}
              </Avatar>
            }
            onClick={handleProfileClick}
            sx={{
              color: theme.palette.text.primary,
              '&.Mui-selected': {
                color: theme.palette.primary.main,
                transform: 'scale(1.2)',
                transition: 'transform 0.3s ease',
              },
              '&:hover': {
                color: theme.palette.primary.main,
              }
            }}
          />
        )}

        {/* Dark Mode Toggle Icon */}
        <BottomNavigationAction
          label=""
          icon={theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          onClick={toggleTheme}
          sx={{
            color: theme.palette.text.primary,
            '&.Mui-selected': {
              color: theme.palette.primary.main,
            },
            '&:hover': {
              color: theme.palette.primary.main,
            },
            marginLeft: 'auto',
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <MenuItem onClick={() => handleMenuItemClick(`/profil/`)}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <Typography>Profil</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <Typography>Odhlásiť sa</Typography>
          </MenuItem>
        </Menu>
      </BottomNavigation>
    </Box>
  );
}
