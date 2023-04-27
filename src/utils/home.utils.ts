import { signOut } from "next-auth/react";
import type { NextRouter } from "next/router";

export const getQuestion = (hasSession: boolean) => {
  return hasSession ? 'Deseja ver mais detalhes de quem é você?' : 'Para saber quem é você, favor efetuar login'
}
export const getSignoutButtonText = (hasSession: boolean) => {
  return hasSession ? 'Não' : 'Sair';
}

export const handleLogout = async (router: NextRouter) => {
  await signOut();
  router.push('/api/auth/signin');
}