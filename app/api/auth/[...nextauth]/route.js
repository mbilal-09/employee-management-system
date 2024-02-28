// pages/api/auth/[...nextauth].js

import User from '@/models/employee';
import connectToDB from '@/utils/database';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    Credentials({
      // The name to display on the sign-in form (e.g., 'Sign in with...')
      name: 'Credentials',
      credentials: {
        // Username and password fields
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Add logic to validate credentials, usually by querying your database

        const { username, password } = credentials;

        connectToDB();

        if (email === '123@gmail.com' && password === '123') {
          // If credentials are valid, return the user object

          console.log('username---->' + email, password);

          return { email: email };

        } else {
          return false
        }
      }
    })
  ],
  // Add session handling callback functions
  callbacks: {
    async signIn(user, account, profile) {
      // Custom sign-in logic if needed
      console.log("user------>"+ user);
      return true;
    },
    async session({ session }) {
      console.log(  'session-->', session);
      // const sessionUser = await User.findOne({
      //   email: session.user.email,
      // });
      // sessionUser?.password = undefined;
      // session.user = sessionUser;

      return session;
  }}
});

export { handler as GET, handler as POST };