import NextAuth, { Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    })
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      // Aqui eu posso interceptar a sessão e alterar alguma informaçao bem como adicionar algo novo!
      const currentDate = new Date();

      const transforToTwoDigit = (number: number) => number < 10 ? `0${number}` : `${number}`;

      session.loginTime = `${transforToTwoDigit(currentDate.getHours())}:${transforToTwoDigit(currentDate.getUTCMinutes())}`;

      return session;
    }
  }

}

// O next auth faz um gestão de autenticação utilizando os cookies!
export default NextAuth(authOptions)