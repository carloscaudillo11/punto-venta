import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from '../../axios';

interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  role?: string | null | undefined; // add role property
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const signinResponse = await axios
          .post('auth/signin', {
            email: credentials?.email,
            password: credentials?.password
          })
          .catch((err) => {
            throw new Error(err.response.data.message);
          });
        return signinResponse.data;
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user !== undefined) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.user as User;
      return session;
    }
  },
  pages: {
    signIn: '/signin'
  }
});

export { handler as GET, handler as POST };
