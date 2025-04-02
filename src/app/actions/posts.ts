// src/app/actions/posts.ts
"use server";

import { prisma } from "@/app/api/auth/prisma/prisma";
import { revalidatePath } from "next/cache";

export const fetchPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        images: {
          select: {
            imageUrl: true,
          },
          take: 1,
        },
        likes: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export async function toggleLike(postId: string, userId: string) {
  if (!userId) {
    throw new Error("User ID is required to like a post");
  }

  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      revalidatePath("/prispevok");
      revalidatePath(`/prispevok/${postId}`);
      return { liked: false };
    } else {
      await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
      revalidatePath("/prispevok");
      revalidatePath(`/prispevok/${postId}`);
      return { liked: true };
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
}

export async function getPostWithComments(postId: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        images: true,
        likes: true,
        comments: {
          where: { parentId: null },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            likes: true,
            replies: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
                likes: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}