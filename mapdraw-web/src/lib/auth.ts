import NextAuth from "next-auth";

import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import db from "@/db/index";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export default NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (!user?.email) return token;

      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, user.email),
      });

      if (existingUser) {
        token.userId = existingUser.id;
        return token;
      }

      const record = await db
        .insert(users)
        .values({
          email: user.email,
          name: user.name ?? "",
        })
        .returning();

      token.userId = record[0].id;

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as number;
      }

      return session;
    },
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: { params: { prompt: "consent" } },
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID!,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET!,
      authorization: { params: { prompt: "consent" } },
    }),
  ],
});
