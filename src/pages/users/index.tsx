import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router";

const styles = {
  span: 'font-bold'
}

const getBrowserName = (userAgent: string): string => {
  if (userAgent.indexOf('Chrome') !== -1) return 'Google Chrome';
  if (userAgent.indexOf('Firefox') !== -1) return 'Mozilla Firefox';
  if (userAgent.indexOf('Safari') !== -1) return 'Apple Safari';
  return 'Não foi possível definir seu navegador'
}

function Users() {
  const { data: session } = useSession();
  const router = useRouter();
  const userAgent = navigator.userAgent;

  if(!session?.user) return <main>Você não está logado, favor efetuar login...</main>
  return (
    <>
      <header className="flex justify-center">
        <button className="border w-40 border-black mt-4 hover:bg-slate-400" onClick={() => router.push('/')}>
          Início
        </button>
      </header>
      <main className='flex flex-col justify-center items-center h-screen'>
        <Image src={session?.user?.image || ''} width={200} height={200} className="rounded-full mb-6" alt="Avatar image" />
        <h3><span className={styles.span}>Nome: </span>{session?.user?.name}</h3>
        <h3><span className={styles.span}>Email: </span>{session?.user?.email}</h3>
        <h3><span className={styles.span}>Navegador: </span>{getBrowserName(userAgent)}</h3>
        <h3><span className={styles.span}>Logado desde: </span>{session?.loginTime}</h3>
      </main>
    </>
  )
}

Users.isProtected = true;

export default Users;
