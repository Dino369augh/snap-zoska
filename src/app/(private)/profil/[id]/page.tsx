//src/app/profil/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { getUserProfile } from '@/app/actions/profile';
import {
  Container,
  Box,
  Avatar,
  Typography,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Skeleton,
  Stack,
} from '@mui/material';

interface Post {
  id: string;
  imageUrl: string;
  caption: string | null;
  createdAt: Date;
}

interface UserProfile {
  id: string;
  name: string | null;
  image: string | null;
  email: string | null;
  posts: Post[];
  _count: {
    posts: number;
  };
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getUserProfile(params.id);
        setProfile(data);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [params.id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Skeleton variant="circular" width={150} height={150} sx={{ mr: 4 }} />
          <Stack spacing={2} flex={1}>
            <Skeleton variant="text" width="40%" height={40} />
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="text" width="20%" />
          </Stack>
        </Box>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center" color="text.secondary">
          Používateľ nebol nájdený
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Profile Header */}
      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
          <Avatar
            src={profile.image || undefined}
            alt={profile.name || 'User'}
            sx={{ width: 150, height: 150 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom>
              {profile.name || 'Unnamed User'}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {profile.email}
            </Typography>

            <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
              <Box>
                <Typography variant="h6">{profile._count.posts}</Typography>
                <Typography variant="body2" color="text.secondary">Príspevkov</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Posts Grid */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Príspevky
      </Typography>
      
      <Grid container spacing={2}>
        {profile.posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={post.imageUrl}
                alt={post.caption || 'Post image'}
                sx={{ objectFit: 'cover' }}
              />
              {post.caption && (
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {post.caption}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                    {new Date(post.createdAt).toLocaleDateString('sk-SK')}
                  </Typography>
                </CardContent>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>

      {profile.posts.length === 0 && (
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 4 }}>
          Žiadne príspevky na zobrazenie
        </Typography>
      )}
    </Container>
  );
}