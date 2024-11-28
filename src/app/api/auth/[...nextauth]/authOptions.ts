// src/app/api/auth/[...nextauth]/authOptions.ts

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/prihlasenie', // Custom sign-in page
    signOut: '/auth/odhlasenie', // Custom sign-out page
  },
  callbacks: {
    async redirect({ baseUrl }: {baseUrl: string }) {
      // Always redirect to /profil after sign-in
      return baseUrl + '/profil'; // Redirecting to /profil page after sign-in
    },
  },
};
