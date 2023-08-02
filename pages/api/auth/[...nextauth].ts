import {
  fetchGoogleControllerAuthenticate,
  useGoogleControllerAuthenticate,
} from "@/services/api/raidar/raidarComponents";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

interface WithToken {
  token: string;
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token: jwt, account, user }) {
      const userWithToken = user as unknown as WithToken;

      if (account?.access_token) {
        const { token } = (await fetchGoogleControllerAuthenticate({
          body: { token: account?.access_token },
        })) as unknown as any;
        jwt.token = token;
      } else if (userWithToken?.token) {
        jwt.token = userWithToken.token;
      }

      return jwt;
    },
    async session({ session, token }) {
      session.token = (token as unknown as WithToken).token;
      return session;
    },
  },
};

export default NextAuth(authOptions);
