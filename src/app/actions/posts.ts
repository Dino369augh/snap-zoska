"use server";

import { prisma } from "@/app/api/auth/prisma/prisma";

export const fetchPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true
          }
        },
        images: {
          select: {
            imageUrl: true
          },
          take: 1
        }
      }
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};