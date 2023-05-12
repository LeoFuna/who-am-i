import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import Image from "next/image";
import { useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const oAuthProviders = Object.values(providers).filter(provider => provider.id !== 'credentials');
  //Usado ref para evitar rerenders no onChange dos inputs
  // Ideal seria criar um formulário para isso, entretanto não é o intuito desse projeto trabalhar com essa questão.
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const onSubmit = () => {
    signIn('credentials', { email: emailRef.current, password: passwordRef.current, callbackUrl: '/' });
  }

  const onRegister = () => router.push('/accounts/register');

  return (
    <>
      <Head><title>Login</title></Head>
      <main className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-cyan-300 to-sky-600">
        <div className="bg-white rounded-lg flex flex-col items-center justify-center lg:w-2/6 w-5/6 py-10 lg:py-6 gap-2 shadow-2xl">
          <h1 className="text-2xl font-bold text-purple-600 drop-shadow-md">ÁREA DE LOGIN</h1>
          <div className="px-7 py-4 flex flex-col gap-4 w-full">
            <p className="text-slate-800">Email</p>
            <input
              onChange={(event) => emailRef.current = event.target.value}
              className="border rounded-md p-2 text-slate-800 focus:outline-none focus:shadow-md focus:shadow-sky-600 focus:border-sky-600"
              type="text"
            />
            <p className="text-slate-800">Senha</p>
            <input
              onChange={(event) => passwordRef.current = event.target.value}
              className="border rounded-md p-2 text-slate-800 focus:outline-none focus:shadow-md focus:shadow-sky-600 focus:border-sky-600"
              type="text"
            />
            <button className="p-2 rounded-md border bg-gradient-to-tr from-purple-500 to-purple-600 text-white font-bold text-lg" type="submit" onClick={onSubmit}>
              Entrar
            </button>
            <button className="p-2 rounded-md border border-purple-600 text-purple-600 font-bold text-lg" type="submit" onClick={onRegister}>
              Cadastrar
            </button>
          </div>
          <div className="px-7 flex flex-col gap-4 w-full">
            <h3 className="mx-auto text-xl">Ou</h3>
            {oAuthProviders.map((provider) => (
              <button
                key={provider.name}
                className=" flex justify-center p-2 rounded-md border bg-gradient-to-tr from-cyan-300 to-sky-600 text-white font-bold text-lg"
                onClick={() => signIn(provider.id)}
              >
                <Image className="mr-6" src={`/${provider.id}.png`} width={30} height={30} alt={`${provider.id} image`} />
                Entrar com {provider.name}
              </button>
            ))}
            <button className="p-2 rounded-md border border-sky-600 text-sky-600 font-bold text-lg" type="submit" onClick={() => router.push('/')}>
              Entrar como Anônimo
            </button>
          </div>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Aqui é para o caso de verificar se já tem sessao valida ativa e se sim, já manda pra Home!
  // Estamos usando o server-side nesse caso, isso acontece antes da renderizaçao do componente
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) return { redirect: { destination: "/" } };
  //---
  const providers = await getProviders();

  return { props: { providers: providers ?? [] } };
}