import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import db from './../../../../prisma/db';
import bcrypt from 'bcrypt';

const ONE_DAY = 24 * 60 * 60;

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const userFound = await db.user.findUnique({
          where: { email: credentials?.email },
          include: { avatar: true },
        });
        if (!userFound) return null;
        if (!credentials?.password) return null;
        if (!await bcrypt.compare(credentials?.password, userFound.password)) return null;

        return { id: userFound.id, name: userFound.displayName, email: userFound.email };
      }
    })
  ],
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: ONE_DAY,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) { token.id = user.id }
      return token;
    },
    async session({ token, session }: any) {
      // Aqui eu posso interceptar a sessão e alterar alguma informaçao bem como adicionar algo novo!
      const currentDate = new Date();

      const transforToTwoDigit = (number: number) => number < 10 ? `0${number}` : `${number}`;

      if (!!token && !!session.user) {
        session.loginTime = `${transforToTwoDigit(currentDate.getHours())}:${transforToTwoDigit(currentDate.getUTCMinutes())}`;
        session.user.id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
  // Para pagina de Sign customizada usando o signIn() é necessário a secret
  secret: process.env.JWT_SECRET as string,
}

// O next auth faz um gestão de autenticação utilizando os cookies!
export default NextAuth(authOptions)