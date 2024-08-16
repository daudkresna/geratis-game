import { bcrypt } from "@/app/lib/bcrypt";
import prisma from "@/app/lib/prisma";
import type { Adapter } from "next-auth/adapters";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  // Disini error terjadi kemungkinan karena terdapat 2 object adapter yang berbeda
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, id: user.id };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
        },
      };
    },
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "locos", email: "jsmith@example.com" };

        if (!credentials?.email && !credentials?.password) {
          return null;
          // Any object returned will be saved in `user` property of the JWT
        }

        const match = await prisma.user.findUnique({
          select: {
            id: true,
            email: true,
            hashedPassword: true,
          },
          where: {
            email: credentials?.email,
          },
        });

        if (!match) {
          return null;
        }
        const valPassword = await bcrypt.compare(
          credentials.password,
          match.hashedPassword,
        );
        if (!valPassword) {
          return null;
        }
        return match;
      },
    }),
  ],
};

export default authOptions;
