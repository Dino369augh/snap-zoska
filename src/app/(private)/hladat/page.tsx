'use client';

import { useEffect, useState } from 'react';
import { getAllUsers } from '../../../app/actions/search';
import {
  Container,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Paper,
  CircularProgress,
  Box,
  InputAdornment,
  Card,
  Popper,
  ClickAwayListener,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';

interface User {
  id: string;
  name: string | null;
  image: string | null;
}

export default function SearchPage() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      const users = await getAllUsers();
      setAllUsers(users);
      setLoading(false);
    };
    loadUsers();
  }, []);

  const filteredUsers = searchQuery.trim() 
    ? allUsers.filter(user => 
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false
      )
    : [];

  const handleSearchFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl) && searchQuery.trim().length > 0;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Používatelia
        </Typography>
        
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box>
            <TextField
              fullWidth
              label="Vyhľadať používateľa"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchFocus}
              sx={{ mb: 4 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <Popper 
              open={open}
              anchorEl={anchorEl}
              placement="bottom-start"
              style={{ width: anchorEl?.clientWidth, zIndex: 1000 }}
              modifiers={[
                {
                  name: 'offset',
                  options: {
                    offset: [0, 2],
                  },
                },
              ]}
            >
              <Paper 
                elevation={6} 
                sx={{ 
                  mt: 0.5, 
                  maxHeight: '400px', 
                  overflow: 'auto',
                  border: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: 'background.paper',
                }}
              >
                <List>
                  {filteredUsers.map((user) => (
                    <ListItem
                      key={user.id}
                      component={Link}
                      href={`/profil/${user.id}`}
                      divider
                      sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        py: 2,
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                      }}
                      onClick={() => {
                        setAnchorEl(null);
                        setSearchQuery('');
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar 
                          src={user.image || undefined} 
                          alt={user.name || 'User'}
                          sx={{ 
                            width: 56,
                            height: 56,
                            mr: 2
                          }}
                        >
                          {user.name?.[0] || 'U'}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.name || 'Unnamed User'}
                        primaryTypographyProps={{
                          variant: 'h6',
                          sx: { ml: 1 }
                        }}
                      />
                    </ListItem>
                  ))}
                  {filteredUsers.length === 0 && (
                    <ListItem>
                      <ListItemText
                        primary="Neboli nájdení žiadni používatelia"
                        sx={{ color: 'text.secondary', textAlign: 'center' }}
                      />
                    </ListItem>
                  )}
                </List>
              </Paper>
            </Popper>
          </Box>
        </ClickAwayListener>

        {!searchQuery.trim() && (
          <>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              Všetci používatelia
            </Typography>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {allUsers.map((user) => (
                  <Card key={user.id} sx={{ mb: 0 }}>
                    <ListItem
                      component={Link}
                      href={`/profil/${user.id}`}
                      sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        py: 2,
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar 
                          src={user.image || undefined} 
                          alt={user.name || 'User'}
                          sx={{ 
                            width: 56,
                            height: 56,
                            mr: 2
                          }}
                        >
                          {user.name?.[0] || 'U'}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.name || 'Unnamed User'}
                        primaryTypographyProps={{
                          variant: 'h6',
                          sx: { ml: 1 }
                        }}
                      />
                    </ListItem>
                  </Card>
                ))}
              </List>
            )}
          </>
        )}
      </Box>
    </Container>
  );
} 