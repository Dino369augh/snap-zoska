// src/components/LikeButton.tsx
"use client";

import { useState } from "react";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toggleLike } from "@/app/actions/posts";

interface LikeButtonProps {
  postId: string;
  userId: string;
  initialLikes: number;
  initialLiked: boolean;
}

export default function LikeButton({
  postId,
  userId,
  initialLikes,
  initialLiked,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikes);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up to parent elements
    e.preventDefault(); // Prevent default link behavior
    
    try {
      const { liked: newLikedState } = await toggleLike(postId, userId);
      setLiked(newLikedState);
      setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1));
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <IconButton 
        onClick={handleLike} 
        aria-label="like"
        sx={{ p: 0 }} // Remove padding to prevent misclicks
      >
        {liked ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderIcon color="action" />
        )}
      </IconButton>
      <span>{likeCount}</span>
    </div>
  );
}