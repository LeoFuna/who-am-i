import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Roboto } from 'next/font/google';
// Usando google fonts...a chave "variable" é usada para funcionar com o Tailwind css, senao poderiamos usar a className
const mainFont = Roboto({ weight: '400', subsets: ['latin'], variable: '--font-main' })

type AuthTypes = {
  children: React.ReactElement;
}

const Auth = ({ children }: AuthTypes) => {
  const { status } = useSession();
  const router = useRouter();
  if (status === 'unauthenticated' && router.pathname !== '/signin') {
    signIn();
  }
  if (status === 'loading' && router.pathname !== '/signin') {
    return <div>Verificando token...</div>
  }
  return (children)
}

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <SessionProvider session={session}>
      <main className={`${mainFont.variable} font-main`}>
        {Component.isProtected
          ? <Auth><Component {...pageProps} /></Auth>
          : <Component {...pageProps} />
        }
      </main>
    </SessionProvider>
  )
};
