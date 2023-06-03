import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "lib/mongodb";
import { API_URL } from "../../../../utils/api";

export const authOptions = {
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
      try {
        const tokenResponse = await fetch(`${API_URL}/api/users/token/${user.id}`);
        const accessToken = await tokenResponse.json();
        session.token = accessToken;
        const data = await fetch(`${API_URL}/api/users/me`, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (data.ok) {
          const userData = await data.json();
          session.user = userData;
        } else {
          // Manejo de error en caso de una respuesta no exitosa
          throw new Error('Error al obtener los datos del usuario');
        }
        return session;
      } catch (error) {
        // Manejo de error general
        console.error('Error en la sesión:', error);
        // Puedes tomar medidas adicionales, como redirigir a una página de error o mostrar un mensaje al usuario
        return session;
      }
    },
  },
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);
