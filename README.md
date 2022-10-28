<div align="center">
   <img alt="NLW eSports" src=".github/logo-nlw-esports.svg" width="40%"/>
</div>
<br/>
<div align="center">
   <a href="https://github.com/brunofhorn">
      <img alt="Made by brunofhorn" src="https://img.shields.io/badge/made%20by-brunofhorn-blue">
   </a>
   <a href="https://github.com/brunofhorn/duo-esports/commits/main">
      <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/brunofhorn/duo-esports">
   </a>
   <a href="https://github.com/brunofhorn/duo-esports/issues">
      <img alt="GitHub Issues" src="https://img.shields.io/github/issues/brunofhorn/duo-esports">
   </a>
   <a href="https://github.com/brunofhorn/duo-esports/pulls">
      <img alt="Pull Requests Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
   </a>
   <a href="https://github.com/brunofhorn/duo-esports/blob/main/LICENSE.md">
      <img alt="GitHub License" src="https://img.shields.io/github/license/brunofhorn/duo-esports">
   </a>
   </br>
</div>
<br />
<div align="center">
   <img src=".github/app-preview.jpeg" alt="NLW eSports" />
</div>
</br>
<div align="center">

[**Links**](#-links) &nbsp;&nbsp;**|**&nbsp;&nbsp;
[**Projeto**](#-projeto) &nbsp;&nbsp;**|**&nbsp;&nbsp;
[**Features**](#-features) &nbsp;&nbsp;**|**&nbsp;&nbsp;
[**Tecnologias**](#-tecnologias) &nbsp;&nbsp;**|**&nbsp;&nbsp;
[**Layout**](#-layout) &nbsp;&nbsp;**|**&nbsp;&nbsp;
[**Instalação**](#-instalação) &nbsp;&nbsp;**|**&nbsp;&nbsp;
[**Contribuição**](#-contribuição) &nbsp;&nbsp;**|**&nbsp;&nbsp;
[**Contato**](#-contato) &nbsp;&nbsp;**|**&nbsp;&nbsp;
[**Licença**](#-licença)

</div>

## 🔗 Links

O projeto pode ser acompanhado através do link: <a href="https://duo-esports-ignite.vercel.app/" target="_blank">**DUO eSports**</a>.

## 🎮 Projeto

<img src=".github/landing-web.png" alt="NLW eSports" />

<br/>

**NLW eSports** é o projeto desenvolvido durante a trilha Ignite da **Next Level Week**, um evento online produzido pela [**Rocketseat**](https://github.com/Rocketseat).

Trata-se de um sistema que permite os usuários buscarem seu duo (dupla) em jogos online e publicar um anúncio para encontrar outros jogadores no jogo que desejar.
<br/>
<br/>
<img src=".github/create-ad-web.png" alt="Modal de criação de anúncio" />

Na versão mobile, são exibidos os anúncios dos jogadores para os jogos cadastrados, e os usuários terão a possibilidade de se conectarem pelo discord para jogarem juntos.

<img src=".github/mobile-screens.png" alt="Telas do aplicativo mobile" />

## ✨ Features

- [x] Mudança de ReactJS + NodeJS para NextJS (web)
- [x] Listagem de games (web e mobile)
- [x] Criação de um novo anúncio (web e mobile)
- [x] Validação de autenticação com o discord (web)
- [x] Validações de formulário com o Zod (web)
- [x] Combobox autocomplete com lista de games para seleção (web)
- [x] Context API (web)
- [x] Feedbacks para o usuário: loading durante criação, mudança de página, toast de sucesso e erro (web)
- [x] Listagem de anúncios (web e mobile)
- [x] Copiar o usuário do discord para a área de transferência (web e mobile)
- [x] Página de erro 404 (web e mobile)
- [ ] Recebendo notificações push (mobile)
- [ ] Design totalmente responsivo (web)

## 🚀 Tecnologias

### Web + Server

<ul>
   <li>ReactJS (https://reactjs.org/)</li>
   <li>NextJS (https://nextjs.org/)</li>
   <li>Typescript (https://www.typescriptlang.org/)</li>
   <li>Tailwind CSS (https://tailwindcss.com/)</li>
   <li>Radix UI (https://www.radix-ui.com/)</li>
   <li>Axios (https://axios-http.com/ptbr/docs/intro)</li>
   <li>Prisma (https://prisma.io/)</li>
   <li>PostgreSQL (https://www.postgresql.org/)</li>
   <li>React Hook Form (https://react-hook-form.com/)</li>
   <li>Phosphor Icons (https://phosphoricons.com/)</li>
   <li>ZOD (https://zod.dev/)</li>
   <li>Next Auth (https://next-auth.js.org/)</li>
   <li>React Spring (https://react-spring.dev/)</li>
   <li>React Swiper (https://swiperjs.com/react)</li>
   <li>Vercel - Hospedagem Web (https://vercel.com/)</li>
   <li>Heroku - Hospedagem PostgreSQL (https://www.heroku.com/)</li>
</ul>

### Mobile

<ul>
   <li>React Native (https://reactnative.dev/)</li>
   <li>Expo (https://docs.expo.dev/)</li>
   <li>React Navigation (https://reactnavigation.org/)</li>
   <li>Phosphor Icons (https://phosphoricons.com/)</li>
   <li>Typescript (https://www.typescriptlang.org/)</li>
</ul>

## 📟 Layout

O layout das telas da aplicação **NLW eSports** foi desenvolvido pela equipe da **Rocketseat** através da ferramenta [**Figma**](https://www.figma.com), um software de prototipação voltado para **UI Design (design de interfaces de usuário)**.
Você pode acessar o layout através deste link: [**NLW eSports**](https://www.figma.com/community/file/1150897317533332617).

## 🔧 Instalação

Para baixar o código-fonte do projeto em sua máquina, primeiramente terá que ter instalado o [**Git**](https://git-scm.com/).

Com o Git instalado, em seu terminal execute o seguinte comando:

```bash
git clone https://github.com/brunofhorn/duo-esports.git
```

Para instalar as dependências e executar o projeto terá que ter instalado em sua máquina o [**Node.js**](https://nodejs.org/en/), que vem acompanhado do NPM. Com ele instalado:

### Web + Server

A versão web / server está na pasta **web**. Para testar, rode o seguinte comando:

```bash
npm install
```

Em seguida execute o comando abaixo para rodar o projeto:

```bash
npm run dev

```

Abra http://localhost:3000 em seu navegador para ver o resultado.

**Não esqueça de executar o prisma e gerar as tabelas. Você precisará criar um banco de dados e hospedá-lo (no caso do PostgreSQL) ou então utilizar o SQLite ou algum banco da sua preferência e vincular no arquivo .env.**

Veja mais na documentação do <a href="https://prisma.io/" target="_blank">**Prisma**</a>.

### Mobile

Para testar o projeto na versão mobile, entre na pasta **mobile** e rode o seguinte comando:

```bash
npm install
```

Em seguida, execute o comando abaixo para rodar a versão mobile (em um emulador ou direto no seu celular caso possua o app Expo Go):

```bash
npm start

```

## 💡 Contribuição

- Faça um **_fork_** desse repositório;
- Crie um **branch** para a sua feature: `git checkout -b minha-feature`;
- Faça um **commit** com suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça um **push** para o seu branch: `git push origin minha-feature`;
- Faça um **pull request** com sua feature;

Pull requests são sempre bem-vindos. Em caso de dúvidas ou sugestões, crie uma _**issue**_ ou entre em contato comigo.

## 📲 Contato

Entre em contato comigo por e-mail ou pelas minhas redes sociais:

<a href="mailto:contato@brunofhorn.com.br" target="_blank">
   <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>
</a>
<a href="https://linkedin.com/in/brunofhorn/" target="_blank">
   <img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
</a>
<a href="https://tiktok.com/@brunofhorn" target="_blank">
   <img src="https://img.shields.io/badge/TikTok-000000?style=for-the-badge&logo=tiktok&logoColor=white" alt="Tiktok" />
</a>
<a href="https://twitter.com/brunofhorn" target="_blank">
   <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" />
</a>
<a href="https://instagram.com/brunofhorn" target="_blank">
   <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" />
</a>

## 📝 Licença

<a href="https://github.com/brunofhorn/duo-esports/blob/main/LICENSE">
    <img alt="GitHub License" src="https://img.shields.io/github/license/brunofhorn/duo-esports">
</a>

Esse projeto está sob a licença **MIT**. Veja o arquivo _**LICENSE**_ para mais detalhes.

---

<h5 align="center">
  &copy;2022 - <a href="https://github.com/brunofhorn/">Bruno Fernandes Horn</a>
</h5>
