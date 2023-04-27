import { Roboto } from 'next/font/google'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { getQuestion, getSignoutButtonText, handleLogout } from '@/utils/home.utils';

const inter = Roboto({ weight: '400', subsets: ['latin'] })

const styles = {
  button: 'border w-40 border-black mt-4 hover:bg-slate-400 m-3 disabled:bg-slate-300',
  buttonsDiv: 'flex'
}

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <main className={`flex flex-col justify-center items-center h-screen ${inter.className}`}>
      <h1 className='text-4xl'>Olá você é <span className='font-bold'>{session?.user?.name || 'Anônimo'}</span></h1>
      <h2 className='text-xl'>{getQuestion(!!session)}</h2>
      <div className={styles.buttonsDiv}>
        {!!session && <button className={styles.button} disabled={!session} onClick={() => router.push('/users')}>Sim</button>}
        <button className={styles.button} onClick={() => handleLogout(router)}>{getSignoutButtonText(!!session)}</button>
      </div>
    </main>
  )
}
