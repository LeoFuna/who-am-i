import { Session } from 'next-auth';

// Permite que seja extendido os tipos de um modulo externo
declare module 'next-auth' {
  interface Session {
    loginTime: string;
  }
}
