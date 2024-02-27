// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign-in form (e.g., 'Sign in with...')
      name: 'Credentials',
      credentials: {
        // Username and password fields
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Add logic to validate credentials, usually by querying your database
        const user = { id: 1, name: 'John Doe', email: 'john@example.com' };

        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      }
    })
  ],
  // Add session handling callback functions
  callbacks: {
    async signIn(user, account, profile) {
      // Custom sign-in logic if needed
      console.log(user, account, profile);
      return true;
    },
    async session(session, user) {
      // Add properties to the session object
      session.user.id = user.id;
      return session;
    }
  }
});
