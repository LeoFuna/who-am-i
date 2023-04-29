import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  //Usado ref para evitar rerenders no onChange dos inputs
  // Ideal seria criar um formulário para isso, entretanto não é o intuito desse projeto trabalhar com essa questão.
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const onSubmit = () => {
    console.log(emailRef.current)
    console.log(passwordRef.current)
    // Aqui faremos o trabalho de buscar autenticar com o email e senha passados!
  }

  const onRegister = () => {
    // Aqui o usuário vai poder se cadastrar dentro do sistema!
    // Lembrar que se o usuário entrar com alguma das opçoes de oAuth ele já teria um cadastro com o email da conta
    // Logo ele deve ser barrado de tentar usar o mesmo email de acesso!
  }

  return (
    <main className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-cyan-300 to-sky-600">
      <div className="bg-white rounded-lg flex flex-col items-center justify-center w-2/6 gap-2 shadow-2xl">
        <div className="px-7 py-4 shadow flex flex-col gap-4 w-full">
          <p>Email</p>
          <input
            onChange={(event) => emailRef.current = event.target.value}
            className="border rounded-md p-2 focus:outline-none focus:shadow-md focus:shadow-sky-600 focus:border-sky-600"
            type="text"
          />
          <p>Senha</p>
          <input
            onChange={(event) => passwordRef.current = event.target.value}
            className="border rounded-md p-2 focus:outline-none focus:shadow-md focus:shadow-sky-600 focus:border-sky-600"
            type="text"
          />
          <button className="p-2 rounded-md border bg-gradient-to-tr from-purple-500 to-purple-600 text-white font-bold text-lg" type="submit" onClick={onSubmit}>Entrar</button>
          <button className="p-2 rounded-md border bg-gradient-to-tr from-purple-600 to-purple-500 text-white font-bold text-lg" type="submit" onClick={onRegister}>Cadastrar</button>
        </div>
        {Object.values(providers).map((provider) => (
          <button
            key={provider.name}
            className="flex justify-center items-center m-3 border border-black rounded-lg p-2 w-6/12 hover:bg-slate-400"
            onClick={() => signIn(provider.id)}
          >
            <Image className="mr-6" src={`/${provider.id}.png`} width={30} height={30} alt={`${provider.id} image`} />
            Entrar com {provider.name}
          </button>
        ))}
      </div>
    </main>
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