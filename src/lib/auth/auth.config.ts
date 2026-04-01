import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Simple demo auth - replace with your actual auth logic
        if (credentials?.username === "demo" && credentials?.password === "demo") {
          return {
            id: "1",
            name: "Demo User",
            email: "demo@example.com",
            role: "MEMBER"
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.groupId = user.groupId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.groupId = token.groupId;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
  pages: {
    signIn: "/login",
  }
};

export default authOptions;
