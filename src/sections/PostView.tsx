"use client";

import { useEffect, useState } from "react";
import { Container, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { fetchPosts } from "@/app/actions/posts";

interface Post {
  id: string;
  userId: string;
  caption?: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string | null;
  };
  images: {
    imageUrl: string;
  }[];
}

const PostsView = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    loadPosts();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Príspevky
      </Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card>
              {post.images[0] && (
                <CardMedia
                  component="img"
                  height="140"
                  image={post.images[0].imageUrl}
                  alt={post.caption || "Príspevok bez popisu"}
                />
              )}
              <CardContent>
                <Typography variant="body1">
                  {post.caption || "Bez popisu"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.user.name || "Neznámy používateľ"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PostsView;