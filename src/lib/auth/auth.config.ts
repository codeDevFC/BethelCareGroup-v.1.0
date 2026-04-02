import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
providers: [
Credentials({
name: "Credentials",
credentials: {
username: { label: "Username", type: "text" },
password: { label: "Password", type: "password" }
},
async authorize(credentials) {
// This is a placeholder for your NextAuth logic
// Note: Your manual AuthContext.tsx is currently handling the main login
if (credentials?.username === "admin" && credentials?.password === "BETHEL@UK77") {
return { id: "1", name: "Admin", email: "admin@example.com" };
}
return null;
}
})
],
pages: {
signIn: "/login",
}
};
