import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connection from "@/lib/database";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials) {
        const { email, password } = credentials; //berisi email dan password dri login form

        const [rows] = await connection.execute(
          "SELECT * FROM users WHERE email = ?",
          [email]
        );

        if (rows.length === 0) return null;
        const user = rows[0];

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) { // jwt token membuktikan klo km udh login , token mengatur session role
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) { 
      session.user.role = token.role;
      return session;
    },
  },
});

export { handler as GET, handler as POST };