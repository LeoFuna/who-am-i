import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type AuthTypes = {
  children : React.ReactElement;
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
      {Component.isProtected
      ?  <Auth><Component {...pageProps} /></Auth>
      : <Component {...pageProps} />
    }
    </SessionProvider>
  )
};
