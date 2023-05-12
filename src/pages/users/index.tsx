import { useSession } from "next-auth/react"
import { Roboto } from "next/font/google";
import Head from "next/head";
import Image from "next/image"
import { useRouter } from "next/router";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import accountDetailsService from "@/services/accounts/accounts.details";

const inter = Roboto({ weight: '400', subsets: ['latin'] })

const styles = {
  span: 'font-bold text-purple-600',
  input: 'text-lg text-slate-600',
}

const getBrowserName = (userAgent: string): string => {
  if (userAgent.indexOf('Chrome') !== -1) return 'Google Chrome';
  if (userAgent.indexOf('Firefox') !== -1) return 'Mozilla Firefox';
  if (userAgent.indexOf('Safari') !== -1) return 'Apple Safari';
  return 'Não foi possível definir seu navegador'
}

function Users({ avatarUrl }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();
  const router = useRouter();
  const userAgent = navigator.userAgent;

  if (!session?.user) return <main className={`flex text-5xl text-white items-center justify-center h-screen w-screen bg-gradient-to-br from-cyan-300 to-sky-600 ${inter.className}`}>Página protegida, Redirecionando...</main>
  return (
    <>
      <Head><title>Detalhes</title></Head>
      <div className={`flex items-center justify-center h-screen w-screen bg-gradient-to-br from-cyan-300 to-sky-600 ${inter.className}`}>
        <main className='bg-white rounded-lg flex flex-col items-center justify-center w-2/6 py-10 gap-2 shadow-2xl'>
          {(!!avatarUrl || !!session?.user?.image) &&
            <Image
              src={session?.user?.image || avatarUrl}
              width={200}
              height={200}
              className="rounded-full mb-6 shadow-xl border border-purple-600" alt="Avatar image"
            />
          }
          <h3 className={styles.input}><span className={styles.span}>Nome: </span>{session?.user?.name}</h3>
          <h3 className={styles.input}><span className={styles.span}>Email: </span>{session?.user?.email}</h3>
          <h3 className={styles.input}><span className={styles.span}>Navegador: </span>{getBrowserName(userAgent)}</h3>
          <h3 className={styles.input}><span className={styles.span}>Logado desde: </span>{session?.loginTime}</h3>
          <footer className="w-full flex justify-center">
            <button
              className="p-1 rounded-md border bg-gradient-to-tr from-purple-500 to-purple-600 text-white font-bold text-lg w-6/12 mt-10"
              onClick={() => router.push('/')}
            >
              Início
            </button>
          </footer>
        </main>
      </div>
    </>
  )
}

// Aqui estamos protegende a página de usuários nao autenticados, em conjunto com o que foi feito em _app.tsx
Users.isProtected = true;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  try {
    const user = await accountDetailsService({ id: session?.user.id || '' });

    return { props: { avatarUrl: user?.avatar?.avatarUrl || '' } };
  } catch(e) {
    return { props: { avatarUrl: '' } };
  }

}

export default Users;
