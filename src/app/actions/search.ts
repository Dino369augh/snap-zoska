// src/app/actions/search.ts
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
          mode: 'insensitive',
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
      take: 10,
    });

    return users;
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
}