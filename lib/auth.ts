import { prisma } from "@/prisma/db";

import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.JWT_SECRET || "hackfusion",
  callbacks: {
    // async signIn({ user, account, profile }) {
    //@ts-expect-error: Custom properties (isAdmin) added to user object are not recognized by default in NextAuth.
    async signIn({ user }) {
      // Check if user is an admin
      const isAdmin = await prisma.admin.findUnique({
        where: { email: user.email },
      });
      console.log(isAdmin);
      if (isAdmin) {
        user.isAdmin = true;
        return true;
      }

      // if (!profile.email.endsWith("@citchennai.net")) {
      //   return false
      // }
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (existingUser) {
        user.id = existingUser.id;
      } else {
        const newUser = await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
          },
          select: {
            email: true,
            id: true,
          },
        });
        user.id = newUser.id;
      }

      return true;
    },
    //@ts-expect-error: Adding custom properties to session.user (id, isAdmin) which are not recognized by default.
    async session({ token, session }) {
      session.user.id = token.sub;
      session.user.isAdmin = token.isAdmin;
      console.log(session);

      return session;
    },
    //@ts-expect-error: Custom properties (id, isAdmin) added to token are not recognized by default in NextAuth.
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.isAdmin = user.isAdmin || false;
      }
      return token;
    },
    // async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
    async redirect({  baseUrl }: { baseUrl: string }) {
      return `${baseUrl}/user/home`;
    },
  },
};
