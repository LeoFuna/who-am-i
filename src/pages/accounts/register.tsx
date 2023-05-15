import Spinner from '@/components/Spinner';
import { convertImageFileToBase64 } from '@/utils/file.utils';
import { getMsgOnValidateError } from '@/utils/register.utils';
import { Roboto } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

const inter = Roboto({ weight: '400', subsets: ['latin'] })

const getOptions = (body: any) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
})

const Register = () => {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const fullNameRef = useRef('');
  const avatarRef = useRef<File>();
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const retypePasswordRef = useRef('');
  // Melhorar gestao de erro
  //Em mobile ele nao cadastra...
  const onRegister = async () => {
    setIsRegistering(true);
    const errorMessage = getMsgOnValidateError({
      email: emailRef.current,
      fullName: fullNameRef.current,
      password: passwordRef.current,
      retypePassword: retypePasswordRef.current,
      avatar: avatarRef.current,
    })

    if (!!errorMessage) {
      setIsRegistering(false);
      return alert(errorMessage);
    }

    const imageBase64 = await convertImageFileToBase64(avatarRef.current);

    const body = {
      email: emailRef.current,
      password: passwordRef.current,
      displayName: fullNameRef.current,
      avatarUrl: imageBase64,
    }
    const request = new Request('/api/accounts', getOptions(body));
    try {
      const response = await fetch(request).then(data => data);

      if (response.status === 409) return alert('Email já em uso!');

      router.push('/auth/signin');
    } catch (e: any) {
      alert(e.message)
    } finally {
      setIsRegistering(false);
    }
  }

  return (
    <>
      <Head><title>Cadastro</title></Head>
      <main className={`flex items-center justify-center h-screen w-screen bg-gradient-to-br from-cyan-300 to-sky-600 ${inter.className}`}>
        <div className="bg-white rounded-lg flex flex-col items-center justify-center lg:w-2/6 w-5/6 py-10 lg:py-2 gap-2 shadow-2xl">
          <h1 className="text-2xl font-bold text-purple-600 drop-shadow-md">CADASTRO</h1>
          <div className="px-7 py-4 flex flex-col gap-4 w-full">
            <p className='text-slate-800'>Nome Completo</p>
            <input
              onChange={(event) => fullNameRef.current = event.target.value}
              className="border rounded-md p-2 text-slate-800 focus:outline-none focus:shadow-md focus:shadow-sky-600 focus:border-sky-600"
              type="text"
            />
            <p className='text-slate-800'>Suba um Avatar</p>
            <input
              onChange={(event) => {
                const files = event.target.files;
                if (!!files) {
                  for (const avatar of files) {
                    avatarRef.current = avatar;
                  }
                }
              }}
              className="border rounded-md p-2 text-slate-800 focus:outline-none focus:shadow-md focus:shadow-sky-600 focus:border-sky-600"
              type="file"
              accept='.png, .jpeg'
            />
            <p className='text-slate-800'>Informe o email</p>
            <input
              onChange={(event) => emailRef.current = event.target.value}
              className="border rounded-md p-2 text-slate-800 focus:outline-none focus:shadow-md focus:shadow-sky-600 focus:border-sky-600"
              type="text"
            />
            <p className='text-slate-800'>Informe a senha</p>
            <input
              onChange={(event) => passwordRef.current = event.target.value}
              className="border rounded-md p-2 text-slate-800 focus:outline-none focus:shadow-md focus:shadow-sky-600 focus:border-sky-600"
              type="text"
            />
            <p className='text-slate-800'>Confirmar senha</p>
            <input
              onChange={(event) => retypePasswordRef.current = event.target.value}
              className="border rounded-md p-2 text-slate-800 focus:outline-none focus:shadow-md focus:shadow-sky-600 focus:border-sky-600"
              type="text"
            />
            <button
              className="p-2 flex justify-center rounded-md border bg-gradient-to-tr from-purple-500 to-purple-600 text-white font-bold text-lg"
              type="submit"
              onClick={onRegister}
            >
              {isRegistering ? <Spinner className='ml-4 float-right' /> : 'Cadastrar'} 
            </button>
            <button
              className="p-2 rounded-md border border-purple-600 text-purple-600 font-bold text-lg"
              type="submit"
              onClick={() => router.push('/auth/signin')}
            >
              Voltar
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;