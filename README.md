# Who Am I ( Quem sou eu )
> Projeto de Autenticação
## Sobre o projeto

Projeto voltado a estudar os conceitos de autenticação, buscando trabalhar com páginas e rotas de api públicas e privadas.

O foco do projeto é gerencias locais onde o usuário pode ou não ter acesso.
* [Ferramentas Utilizadas](#ferramentas-utilizadas)
* [Dependências](#dependências)
* [Começando](#começando)
* [Estrutura do projeto](#estrutura-do-projeto)
* [Fases do Desenvolvimento](#fases-do-desenvolvimento)
* [Aplicação](#aplicação)

## Ferramentas Utilizadas
* Next JS
* Node Js
* Typescript
* Prisma
* Tailwind Css
* Next Auth
* oAuth
* JWT
* Cookies
* mySql
* Google Fonts
* Bcrypt

## Dependências
* Node > 18
* Next JS > 13

## Começando

Instalando as dependências
```bash
npm install
```

Configurando variáveis de ambiente

* Ir no seu github pegar as credenciais necessárias de oAuth.
* Ir no seu google cloud e pegar as credenciais de oAuth.
* Informar a URL do banco de dados local mySQL.

Rodando as migrations
```bash
npm run migrate:dev
```

Rodando o projeto
```bash
npm run dev
```
## Estrutura do projeto
```bash
src/
  components/           # Componentes usados na aplicação
  pages/                # Rotas de páginas e de Api
    accounts/           # Página de contas
    api/                # Rotas de Api
      accounts/         # Api de contas
      auth/             # Api de autenticação
    auth/               # Página de Sign in
    users/              # Página de Detalhes do usuário
  services/             # Serviços
    accounts/
  styles/               # Estilos da aplicação
  utils/                # Funções utilitárias
prisma/                 # Arquivos relacionados ao ORM do Prisma
  db/                   # Prisma Client
  migrations/           # Migrações do Banco de Dados
```

## Fases do Desenvolvimento
- [x] Sign in com Github e Google com oAuth (NextAuth)
- [x] Utilizar o getServerSideProps para gerenciar os providers do NextAuth
- [x] Proteger páginas via Validação de Sessão
- [x] Página Home
- [x] Página de Detalhes
- [x] Página customizada para página de Login (SignIn)
- [x] Provider customizado para login com token JWT
- [x] Página de Cadastro de usuário
- [x] Configuração do Prisma e banco de dados MySql
- [x] Criação de rotas de api
- [x] Validações básicas de formulário
- [x] Reponsividade para dispositivos móveis
- [x] Verificaçao de sessao via rotas
- [x] Usar google fonts e Tailwind Css para fonte principal da aplicação
- [x] Subir o projeto na Vercel
- [x] Ajustar a documentação do projeto

## Aplicação

Página de Login Customizada

![image](https://github.com/LeoFuna/who-am-i/assets/80538553/6d02f720-4e52-4b96-b697-e5cf1ae02867)

Página de Cadastro de usuário

![image](https://github.com/LeoFuna/who-am-i/assets/80538553/9f56f6a5-87f3-4815-9eb0-3b8a2185c52f)

Home como Anônimo

![image](https://github.com/LeoFuna/who-am-i/assets/80538553/48456d36-5d7c-49bf-848b-b5bf82b49197)

Home com Usuário Logado

![image](https://github.com/LeoFuna/who-am-i/assets/80538553/5c38c794-af96-4c0a-9b54-3e8488dc0938)

Página de Detalhes do Usuário Logado

![image](https://github.com/LeoFuna/who-am-i/assets/80538553/b47bc566-a00f-45fa-adc5-749cb856ae41)

- [Ver em funcionamento](https://who-am-i-ten.vercel.app/)
