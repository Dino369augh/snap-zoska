import { PrismaClient } from '@prisma/client'; // Import Prisma Client
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Link from 'next/link'; // Link to go back to the list page

export const metadata = { title: "Detail príspevku | Zoska" };

const prisma = new PrismaClient();

// Server-side logic to fetch a specific post by its ID
async function getPostDetails(postId: string) {
  if (!postId) {
    throw new Error('Post ID is required');
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId, // Use the postId to query the post
    },
    include: {
      user: true, // Include user data
    },
  });

  return post;
}

// Component to display the post details
export default async function PostDetail({
  params,
}: {
  params: { id: string };  // Update this to use 'id' instead of 'prispevokId'
}) {
  // Log params to verify the postId
  console.log("Received params:", params);

  if (!params.id) {
    return <Typography variant="h5" sx={{ textAlign: 'center' }}>Post ID is missing.</Typography>;
  }

  // Fetch the post details by the given postId (id)
  const post = await getPostDetails(params.id);

  if (!post) {
    return <Typography variant="h5" sx={{ textAlign: 'center' }}>Post not found</Typography>;
  }

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, fontWeight: 600 }}>
        Detail príspevku
      </Typography>

      {/* Post Image */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <CardMedia
          component="img"
          image={post.imageUrl || 'default-image.jpg'} // Replace with your default image if the post doesn't have an image
          alt={post.caption || 'Príspevok bez popisu'}
          sx={{
            maxWidth: '90%', // Adjust size as necessary
            margin: '0 auto',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            objectFit: 'contain', // Ensures the image fits without stretching
            maxHeight: '500px', // Optionally limit the height to avoid very large images
          }}
        />
      </Box>

      {/* Post Content */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Titulok: {post.caption || 'No Caption Available'}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>
          {new Date(post.createdAt).toLocaleDateString()} {/* Format the date for readability */}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Autor: {post.user.name || 'Neznámy používateľ'}
        </Typography>
      </Box>

      {/* Go back button */}
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Link href="/prispevok">
          <Button variant="contained" color="primary" sx={{ padding: '10px 20px' }}>
            Späť na príspevky
          </Button>
        </Link>
      </Box>
    </>
  );
}
