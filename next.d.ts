import { NextComponentType, NextPageContext } from 'next';
import type { AppProps } from 'next/app';

// Permite que seja extendido os tipos de um modulo externo
declare module 'next/app' {
  interface AppProps {
    Component: NextComponentType<NextPageContext, any, any> & { isProtected: boolean };
    pageProps: any
  }
}
