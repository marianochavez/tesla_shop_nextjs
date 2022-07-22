import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import {dbUsers} from "../../../database";

export default NextAuth({
  providers: [
    Credentials({
      name: "Custom Login",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          required: true,
          placeholder: "correo@example.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
          required: true,
          placeholder: "••••••••",
        },
      },
      async authorize(credentials) {
        return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  // custom pages
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  session: {
    maxAge: 2592000, // 1 month
    strategy: "jwt",
    updateAge: 86400, // 1 day
  },
  // callbacks
  callbacks: {
    async session({session, token}) {
      session.access_token = token.access_token;
      session.user = token.user as any;

      return session;
    },
    async jwt({token, user, account}) {
      switch (account?.type) {
        case "oauth":
          token.user = await dbUsers.oAuthToDbUser(user?.email || "", user?.name || "");
          break;

        case "credentials":
          token.user = user;
          break;
      }

      return token;
    },
  },
});
