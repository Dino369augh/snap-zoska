import { PrismaClient } from '@prisma/client';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Link from 'next/link';

export const metadata = { title: "Detail príspevku | Zoska" };

const prisma = new PrismaClient();

async function getPostDetails(postId: string) {
  if (!postId) {
    throw new Error('Post ID is required');
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      user: true,
      images: {
        take: 1 // Only get the first image
      }
    },
  });

  return post;
}

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  if (!params.id) {
    return <Typography variant="h5" sx={{ textAlign: 'center' }}>Post ID is missing.</Typography>;
  }

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
        {post.images[0] && (
          <CardMedia
            component="img"
            image={post.images[0].imageUrl || '/default-image.jpg'}
            alt={post.caption || 'Príspevok bez popisu'}
            sx={{
              maxWidth: '90%',
              margin: '0 auto',
              borderRadius: '8px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              objectFit: 'contain',
              maxHeight: '500px',
            }}
          />
        )}
      </Box>

      {/* Post Content */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          {post.caption || 'No Caption Available'}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>
          {new Date(post.createdAt).toLocaleDateString()}
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