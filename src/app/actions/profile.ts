// src/app/actions/profile.ts
'use server';

import { db } from "@/lib/db";

export async function getUserProfile(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        image: true,
        email: true,
        posts: {
          select: {
            id: true,
            caption: true,
            createdAt: true,
            images: {
              select: {
                imageUrl: true
              },
              take: 1 // Get first image only
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 9 // Show last 9 posts
        },
        _count: {
          select: {
            posts: true,
          }
        }
      },
    });

    if (!user) return null;

    // Transform posts to include imageUrl directly
    const transformedUser = {
      ...user,
      posts: user.posts.map(post => ({
        ...post,
        imageUrl: post.images[0]?.imageUrl || '/default-image.jpg'
      }))
    };

    return transformedUser;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}