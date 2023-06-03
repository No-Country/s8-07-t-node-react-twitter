import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "lib/mongodb";
import { API_URL } from "../../../../utils/api";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  adapter: MongoDBAdapter(clientPromise),

  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.name = user.name;
      session.user._id = user.id;
      const tokenResponse = await fetch(`${API_URL}/api/users/token/${user.id}`);
      const accessToken = await tokenResponse.json();
      session.token = accessToken;
      const data = await fetch(`${API_URL}/api/users/me`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userData = await data.json();
      session.data = userData;
      return session;
    },
  },
};

export default NextAuth(authOptions);
