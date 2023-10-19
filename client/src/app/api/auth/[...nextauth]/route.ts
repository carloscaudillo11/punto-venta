import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const signinResponse = await axios.post(
          'http://localhost:4000/auth/signin',
          {
            email: credentials?.email,
            password: credentials?.password
          }
        );
        if (signinResponse.status === 500)
          throw new Error('Error al consultar el backend');
        const user = {
          id: signinResponse.data.id,
          name: signinResponse.data.name,
          lastname: signinResponse.data.lastname,
          email: signinResponse.data.email,
          rol: signinResponse.data.rol
        };
        return user;
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user !== undefined) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.user as any;
      return session;
    }
  }
});

export { handler as GET, handler as POST };
