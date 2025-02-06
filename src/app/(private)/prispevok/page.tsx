"use client";

// React imports
import { useEffect, useState } from "react";
import Link from "next/link"; // Import Link from Next.js

// MUI imports
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

// Assuming the fetchPosts function is defined to fetch the posts data
import { fetchPosts } from "@/app/actions/posts"; // Update this path based on your project structure

// Post interface
interface Post {
  id: string;
  userId: string;
  imageUrl: string;
  caption?: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string | null;
  };
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts: Post[] = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    loadPosts();
  }, []);

  return (
    <Container
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        flexGrow: 1, // Ensures container takes available space
        height: "calc(100vh - 80px)", // Set height to viewport height minus padding
        paddingBottom: "80px", // Add padding to prevent navbar overlap
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Zoznam Príspevkov
      </Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            {/* Wrap the Card in a Link to make it clickable */}
            <Link href={`/prispevok/${post.id}`} passHref>
              <Card
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.02)", // Subtle enlarge effect
                    boxShadow: 6, // Adds depth on hover
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="250" // Adjust height for better visibility
                  image={post.imageUrl}
                  alt={post.caption || "Príspevok bez popisu"}
                />
                <CardContent>
                  <Typography variant="body1">
                    {post.caption || "Bez popisu"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.user.name || "Neznámy používateľ"}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PostList;
