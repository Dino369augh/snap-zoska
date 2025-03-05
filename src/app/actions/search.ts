'use server';

import { db } from "@/lib/db";

export async function getAllUsers() {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export async function searchUsers(query: string) {
  if (!query) {
    return getAllUsers();
  }

  try {
    const users = await db.user.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive', // Case-insensitive search
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
      orderBy: {
        name: 'asc',
      },
      take: 10, // Limit results to 10 users
    });

    return users;
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
}

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
          take: 9
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