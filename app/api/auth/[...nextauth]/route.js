// pages/api/auth/[...nextauth].js

import User from "@/models/employee";
import connectToDB from "@/utils/database";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    Credentials({
      // The name to display on the sign-in form (e.g., 'Sign in with...')
      name: "Credentials",
      credentials: {
        // Username and password fields
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Add logic to validate credentials, usually by querying your database

        const { email, password } = credentials;

        await connectToDB();

        const user = await User.findOne({ email });

        if (user) {
          // If credentials are valid, return the user object

          const validPassword = await bcrypt.compare(password, user?.password);

          if (validPassword) {
            return { email: email };
          }

          return false;
        } else {
          return false;
        }
      },
    }),
  ],
  // Add session handling callback functions
  callbacks: {

    async signIn(user, account, profile) {
      // Custom sign-in logic if needed
      return true;
    },
    async session({ session }) {
      connectToDB();

      const sessionUser = await User.findOne({
        email: session?.user?.email,
      });
      sessionUser.password = null;
      session.data = sessionUser;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
