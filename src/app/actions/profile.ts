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
            imageUrl: true,
            caption: true,
            createdAt: true,
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

    return user;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
} 