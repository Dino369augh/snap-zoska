"use client";

import { useState } from "react";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import { useSession } from "next-auth/react";

interface User {
  id: string;
  name: string | null;
  image: string | null;
}

interface Image {
  imageUrl: string;
}

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  user: User;
  likes: { id: string }[];
  replies: Comment[];
}

interface Post {
  id: string;
  caption: string | null;
  user: User;
  images: Image[];
  likes: { id: string }[];
  comments: Comment[];
}

interface PostDetailProps {
  post: Post;
}

export default function PostDetail({ post }: PostDetailProps) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  if (!userId) {
    return <div>Pre túto akciu sa musíte prihlásiť</div>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
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
            <Typography variant="subtitle1">{post.user.name}</Typography>
          </Box>
          
          <Typography variant="body1" gutterBottom>
            {post.caption || "Bez popisu"}
          </Typography>
          
          <Box sx={{ mt: 2 }}>
            <LikeButton
              postId={post.id}
              userId={userId}
              initialLikes={post.likes.length}
              initialLiked={post.likes.some((like) => like.id === userId)}
            />
          </Box>
        </CardContent>
      </Card>
      
      <CommentSection
        postId={post.id}
        userId={userId}
        initialComments={post.comments}
      />
    </Container>
  );
}