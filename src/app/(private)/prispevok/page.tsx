// src/app/(private)/prispevky/page.tsx
"use client";

import { useEffect, useState } from "react";
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent,
  Box,
  Avatar
} from "@mui/material";
import { fetchPosts } from "@/app/actions/posts";
import LikeButton from "@/components/LikeButton";
import Link from "next/link";

interface Post {
  id: string;
  userId: string;
  caption: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  images: {
    imageUrl: string;
  }[];
  likes: {
    id: string;
    userId: string;
  }[];
  _count?: {
    comments: number;
  };
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <Container sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading posts...</div>
      </Container>
    );
  }

  return (
    <Container
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        paddingBottom: "80px",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Zoznam Príspevkov
      </Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Link
              href={`/prispevok/${post.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                  maxWidth: "800px",
                  margin: "0 auto",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: 6,
                  },
                }}
              >
                {post.images[0] && (
                  <CardMedia
                    component="img"
                    image={post.images[0].imageUrl}
                    alt={post.caption || "Príspevok bez popisu"}
                    sx={{
                      width: "100%",
                      maxHeight: "600px",
                      objectFit: "contain",
                      bgcolor: "grey.100",
                    }}
                  />
                )}
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      alt={post.user.name || "User"}
                      src={post.user.image || undefined}
                      sx={{ mr: 2 }}
                    />
                    <Typography variant="subtitle1">
                      {post.user.name || "Neznámy používateľ"}
                    </Typography>
                  </Box>
                  <Typography variant="body1" gutterBottom>
                    {post.caption || "Bez popisu"}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <LikeButton
                      postId={post.id}
                      userId={post.user.id}
                      initialLikes={post.likes.length}
                      initialLiked={post.likes.some(like => like.userId === post.user.id)}
                    />
                    {post._count?.comments && (
                      <Typography variant="body2" color="text.secondary">
                        {post._count.comments} komentárov
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}