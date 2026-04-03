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
        // Demo users for testing
        const users = [
          { id: "1", name: "Admin User", username: "admin", password: "admin123", role: "ADMIN" },
          { id: "2", name: "Frank A", username: "frank", password: "frank123", role: "LEADER", groupId: "1", groupName: "Willenhall Victory" },
          { id: "3", name: "Felix B", username: "felix", password: "felix123", role: "MEMBER", groupId: "1", groupName: "Willenhall Victory" },
        ];
        
        const user = users.find(u => u.username === credentials?.username && u.password === credentials?.password);
        
        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: `${user.username}@example.com`,
            role: user.role,
            groupId: user.groupId,
            groupName: user.groupName,
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
        token.groupName = user.groupName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.groupId = token.groupId;
        session.user.groupName = token.groupName;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "bethel-willenhall-secret-key",
};
