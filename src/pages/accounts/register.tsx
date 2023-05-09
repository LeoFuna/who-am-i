import { Roboto } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useRef } from 'react';

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
  const fullName = useRef('');
  // Pegar ele como base64!!
  // Agora devemos conseguir logar com o usuário criado!!!
  const avatarRef = useRef<File>();
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const retypePasswordRef = useRef('');

  const onRegister = async () => {
    if (passwordRef.current !== retypePasswordRef.current) return alert('Senhas não são idênticas!');

    const body = {
      email: emailRef.current,
      password: passwordRef.current,
      displayName: fullName.current,
    }
    const request = new Request('/api/accounts', getOptions(body));
    const response = await fetch(request)
      .then(data => data)
      .catch(error => error);

    if (response.status === 409) return alert('Email já em uso!');

    router.push('/auth/signin');
  }

  return (
    <>
      <Head><title>Cadastro</title></Head>
      <main className={`flex items-center justify-center h-screen w-screen bg-gradient-to-br from-cyan-300 to-sky-600 ${inter.className}`}>
        <div className="bg-white rounded-lg flex flex-col items-center justify-center w-2/6 py-10 gap-2 shadow-2xl">
          <h1 className="text-2xl font-bold text-purple-600 drop-shadow-md">CADASTRO</h1>
          <div className="px-7 py-4 flex flex-col gap-4 w-full">
            <p>Nome Completo</p>
            <input
              onChange={(event) => fullName.current = event.target.value}
              className="border rounded-md p-2 focus:outline-none focus:shadow-md focus:shadow-sky-600 focus:border-sky-600"
              type="text"
            />
            <p>Suba um Avatar</p>
            <input
              onChange={(event) => {
                const files = event.target.files;
                if (!!files) {
                  for (const avatar of files) {
                    avatarRef.current = avatar;
                  }
                }
              }}
              className="border rounded-md p-2 focus:outline-none focus:shadow-md focus:shadow-sky-600 focus:border-sky-600"
              type="file"
              accept='.png, .jpeg'
            />
            <p>Informe o email</p>
            <input
              onChange={(event) => emailRef.current = event.target.value}
              className="border rounded-md p-2 focus:outline-none focus:shadow-md focus:shadow-sky-600 focus:border-sky-600"
              type="text"
            />
            <p>Informe a senha</p>
            <input
              onChange={(event) => passwordRef.current = event.target.value}
              className="border rounded-md p-2 focus:outline-none focus:shadow-md focus:shadow-sky-600 focus:border-sky-600"
              type="text"
            />
            <p>Confirmar senha</p>
            <input
              onChange={(event) => retypePasswordRef.current = event.target.value}
              className="border rounded-md p-2 focus:outline-none focus:shadow-md focus:shadow-sky-600 focus:border-sky-600"
              type="text"
            />
            <button className="p-2 rounded-md border bg-gradient-to-tr from-purple-500 to-purple-600 text-white font-bold text-lg" type="submit" onClick={onRegister}>
              Cadastrar
            </button>
            <button className="p-2 rounded-md border border-purple-600 text-purple-600 font-bold text-lg" type="submit" onClick={() => router.push('/auth/signin')}>
              Voltar
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;