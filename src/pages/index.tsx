import { Roboto } from 'next/font/google'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { getQuestion, getSignoutButtonText, handleLogout } from '@/utils/home.utils';
import Head from 'next/head';

const inter = Roboto({ weight: '400', subsets: ['latin'] })

const styles = {
  button: 'p-2 rounded-md border bg-gradient-to-tr from-purple-500 to-purple-600 text-white font-bold text-lg w-3/12 m-4',
  buttonLogout: 'p-2 rounded-md border border-purple-600 text-purple-600 bg-white font-bold text-lg w-3/12 m-4',
  buttonsDiv: 'flex justify-center w-screen'
}

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <Head><title>Home</title></Head>
      <main className={`flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-cyan-300 to-sky-600 ${inter.className}`}>
        <h1 className='text-4xl text-white drop-shadow'>Olá você é <span className='font-bold'>{session?.user?.name || 'Anônimo'}</span></h1>
        <h2 className='text-xl text-white m-4 drop-shadow'>{getQuestion(!!session)}</h2>
        <div className={styles.buttonsDiv}>
          {!!session && <button className={styles.button} disabled={!session} onClick={() => router.push('/users')}>Sim</button>}
          <button className={styles.buttonLogout} onClick={() => handleLogout(router)}>{getSignoutButtonText(!!session)}</button>
        </div>
      </main>
    </>
  )
}
