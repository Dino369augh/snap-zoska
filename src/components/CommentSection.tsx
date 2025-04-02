"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import { addComment } from "@/app/actions/posts";

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    name: string | null;
    image: string | null;
  };
  likes: {
    id: string;
  }[];
  replies: Comment[];
}

interface CommentSectionProps {
  postId: string;
  userId: string;
  initialComments: Comment[];
}

export default function CommentSection({
  postId,
  userId,
  initialComments,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [commentContent, setCommentContent] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    try {
      const newComment = await addComment(
        postId,
        userId,
        commentContent,
        replyingTo || undefined
      );
      
      setComments((prev) => {
        if (replyingTo) {
          // Add reply to the parent comment
          return prev.map((comment) => {
            if (comment.id === replyingTo) {
              return {
                ...comment,
                replies: [...comment.replies, newComment],
              };
            }
            return comment;
          });
        } else {
          // Add new top-level comment
          return [newComment, ...prev];
        }
      });
      
      setCommentContent("");
      setReplyingTo(null);
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Komentáre ({comments.length})
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={replyingTo ? "Pridať odpoveď..." : "Pridať komentár..."}
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!commentContent.trim()}
        >
          Odoslať
        </Button>
        {replyingTo && (
          <Button
            onClick={() => setReplyingTo(null)}
            sx={{ ml: 2 }}
          >
            Zrušiť
          </Button>
        )}
      </form>
      
      <List sx={{ mt: 2 }}>
        {comments.map((comment) => (
          <Box key={comment.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt={comment.user.name || "User"}
                  src={comment.user.image || undefined}
                />
              </ListItemAvatar>
              <ListItemText
                primary={comment.user.name}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {comment.content}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Button
                        size="small"
                        onClick={() => setReplyingTo(comment.id)}
                      >
                        Odpovedať
                      </Button>
                    </Box>
                  </>
                }
              />
            </ListItem>
            
            {/* Replies */}
            {comment.replies.length > 0 && (
              <Box sx={{ pl: 6 }}>
                {comment.replies.map((reply) => (
                  <ListItem key={reply.id} alignItems="flex-start" sx={{ pl: 2 }}>
                    <ListItemAvatar>
                      <Avatar
                        alt={reply.user.name || "User"}
                        src={reply.user.image || undefined}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={reply.user.name}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {reply.content}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </Box>
            )}
            
            <Divider variant="inset" component="li" />
          </Box>
        ))}
      </List>
    </Box>
  );
}