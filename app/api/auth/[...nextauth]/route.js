// pages/api/auth/[...nextauth].js

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
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Add logic to validate credentials, usually by querying your database

        const { username, password } = credentials;

        if (username === 'bilal@gmail.com' && password === 'password') {
          // If credentials are valid, return the user object

          console.log('username---->' + username, password);

          return { email: username };

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
      // session.user.id = sessionUser._id.toString();

      return session;
  }}
});

export { handler as GET, handler as POST };