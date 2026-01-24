import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        loginType: { label: "Type", type: "text" }
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("rajgram_db");
        
        const user = await db.collection("users").findOne({ email: credentials?.id });
        if (!user) return null;

        const isCorrect = user.password.startsWith('$2b$') 
            ? await bcrypt.compare(credentials!.password, user.password) 
            : credentials?.password === user.password;

        if (isCorrect) {
          return { 
            id: user._id.toString(), 
            email: user.email, 
            role: user.role, 
            slug: user.slug || "" 
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.slug = user.slug;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.slug = token.slug;
      }
      return session;
    }
  },
  session: { strategy: "jwt" as const },
  secret: process.env.NEXTAUTH_SECRET, // 👈 .env se uthayega
  pages: { signIn: "/login" }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };