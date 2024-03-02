// pages/api/auth/[...nextauth].js

import User from "@/models/employee";
import connectToDB from "@/utils/database";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

// Connect to the database
connectToDB();

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
        try {
          const { email, password } = credentials;

connectToDB();

          // Find user by email
          const user = await User.findOne({ email });

          if (!user) {
            throw new Error("User not found");
          }

          // Validate password
          const validPassword = await bcrypt.compare(password, user.password);

          if (!validPassword) {
            throw new Error("Invalid password");
          }

          // Return user object if credentials are valid
          return user;
        } catch (error) {
          // Handle errors
          console.error("Authentication error:", error.message);
          return null;
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
    async session({ session, user }) {
      try {

connectToDB();
console.log("user --> ", user)
        // Find user by email
        const sessionUser = await User.findOne({ email: user?.email });

        if (sessionUser) {
          // Omit password from session data
          if (sessionUser.password) {
            delete sessionUser.password;
          }
console.log("sessionUser-> ", sessionUser)
          session.data = sessionUser;
        }

        return session;
      } catch (error) {
        console.error("Session error:", error.message);
        return session;
      }
    },
  },
});

export { handler as GET, handler as POST };
