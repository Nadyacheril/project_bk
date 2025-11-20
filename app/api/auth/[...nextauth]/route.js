// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import mysql from "mysql2/promise";
// import bcrypt from "bcryptjs";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: { email: {}, password: {} },
//       async authorize(credentials) {
//         const db = await mysql.createConnection({
//           host: process.env.DB_HOST,
//           user: process.env.DB_USER,
//           password: process.env.DB_PASS,
//           database: process.env.DB_NAME,
//         });

//         const [rows] = await db.execute(
//           "SELECT * FROM users WHERE email = ?",
//           [credentials.email]
//         );

//         if (!rows.length) return null;

//         const user = rows[0];

//         const isValid = await bcrypt.compare(credentials.password, user.password);
//         if (!isValid) return null;

//         console.log("User logged in:", user.email);

//         return {
//           id: user.id,
//           email: user.email,
//           role: user.role,
//         };
//       },
//     }),
//   ],
//   session: { strategy: "jwt" },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = {
//         id: token.id,
//         email: token.email,
//         role: token.role,
//       };
//       return session;
//     },
//   },
//   pages: { signIn: "/login" },
//   secret: process.env.AUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

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
        const { email, password } = credentials;

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
    async jwt({ token, user }) {
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
