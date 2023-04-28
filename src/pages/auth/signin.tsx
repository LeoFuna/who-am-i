import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import Image from "next/image";

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="flex items-center justify-center h-screen w-screen">
      <div className="border border-black rounded-lg flex flex-col items-center justify-center w-6/12">
        <div>
          Aqui seria o form padrão para logar...ou criar...
          Lembrando que teriamos que ter um backend para o caso...gravando o email e usando ele como id...
        </div>
        {Object.values(providers).map((provider) => (
          <button
            key={provider.name}
            className="flex justify-center items-center m-3 border border-black rounded-lg p-2 w-6/12 hover:bg-slate-400"
            onClick={() => signIn(provider.id)}
          >
            <Image  className="mr-6"src={`/${provider.id}.png`} width={30} height={30} alt={`${provider.id} image`} />
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