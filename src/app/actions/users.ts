'use server';

import { prisma } from "@/app/api/auth/[...nextauth]/prisma";

export async function searchUsers(query: string) {
  if (!query) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
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
      take: 10, // Limit results to 10 users
    });

    return users;
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
} 