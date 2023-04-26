import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


const Page = () => {
  const router = useRouter();

  const { callbackUrl = '/', error } = router.query;

  // useEffect(() => {
  //   if (loggedIn) {
  //     router.push('/');
  //   }
  // }, [router, loggedIn]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div>
        Formulário para login
      </div>
    </>
  );
};

export default Page;