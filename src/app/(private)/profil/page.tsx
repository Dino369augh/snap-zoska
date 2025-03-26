// src/app/pridat/page.tsx

'use client';

import { useState } from 'react';
import { 
  Typography,
  TextField,
  Box,
  Avatar,
  Button,
  Paper,
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

export default function ProfilePage() {
  // Initial profile data
  const [profile, setProfile] = useState({
    name: "Janko Hraško",
    description: "Nadšený fotograf a dobrodruh",
    location: "Bratislava, Slovensko"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Môj profil
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Profile Header with Avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, flexWrap: 'wrap' }}>
          <Avatar 
            sx={{ 
              width: 120, 
              height: 120,
              fontSize: 48,
              mr: 4,
              mb: { xs: 2, sm: 0 }
            }}
          >
            {profile.name.charAt(0)}
          </Avatar>
          
          <Box sx={{ flex: 1, minWidth: 250 }}>
            {isEditing ? (
              <TextField
                name="name"
                label="Meno"
                value={profile.name}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
            ) : (
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {profile.name}
              </Typography>
            )}
            
            {isEditing ? (
              <TextField
                name="location"
                label="Lokácia"
                value={profile.location}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
            ) : (
              <Typography variant="subtitle1" color="text.secondary">
                {profile.location}
              </Typography>
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* About Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            O mne
          </Typography>
          {isEditing ? (
            <TextField
              name="description"
              label="Popis"
              value={profile.description}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              sx={{ mb: 2 }}
            />
          ) : (
            <Typography>
              {profile.description || "Žiadny popis."}
            </Typography>
          )}
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {isEditing ? (
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Ukladá sa..." : "Uložiť zmeny"}
            </Button>
          ) : (
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => setIsEditing(true)}
            >
              Upraviť profil
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
}