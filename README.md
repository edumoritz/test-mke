<br />
<p align="center">
  <a>
    <img alt="Github Explore" title="Github Explore" src=".github/tech_reactnative.webp" width="200">
    <img alt="Github Explore" title="Github Explore" src=".github/ang.png" width="200">
    <img alt="Github Explore" title="Github Explore" src=".github/ts.png" width="200">
  </a>
</p>

<h3 align="center">
  🎉 Aplicação CRUD, Filtros e Ordenação 🎉
</h3>

<p align="center">
  <a>
    <img alt="Repo Size" title="Repo Size" src="https://img.shields.io/github/repo-size/edumoritz/test-mke"">
  </a>

  <a href="https://github.com/edumoritz/test-mke/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/edumoritz/test-mke?color=%23999">
  </a>

  <a href="https://www.linkedin.com/in/eduardo-moritz-5298a0118/">
    <img alt="Made by Eduardo Moritz" src="https://img.shields.io/badge/made%20by-edumoritz-%23999">
  </a>
  
  <a>
    <img alt="Languages" title="Languages" src="https://img.shields.io/github/languages/count/edumoritz/test-mke">
  </a>
</p>

<p align="center">
Essa aplicação é um exemplo de CRUD, filtros e ordenação de lista no frontend
<p>



## 📖 Índice

- [Tecnologias](#rocket-tecnologias)
- [Funcionalidades](#bookmark-funcionalidades)
- [Instalação](#instalação)
- [Feedback](#feedback)

## :rocket: Tecnologias

* Backend: Node e Typescript,
* Frontend: Angular,
* Mobile: React-Native,

## :bookmark: Funcionalidades

* É possível realizar CRUD de produtos com categorias, caso a categoria não exista será criada uma nova.
* É possível realizar filtros e ordenações tanto de produtos como de categorias.

<p align="center">
  <img src = ".github/frontcreate.png" width=700>
  <img src = ".github/frontsearch.png" width=700>
</p>
<p align="center">
  <img src = ".github/mobcad.png" width=200>
  <img src = ".github/moblist.png" width=200>
  <img src = ".github/mobsearch.png" width=200>
</p>



## Instalação

Primeiro é preciso clonar este repositório com o seguinte comando:
```
  git clone https://github.com/edumoritz/test-mke.git 
```
Logo após clonar é preciso entrar na pasta do projeto:
```
  cd test-mkr
```
Dentro dessa pasta irá conter 3 pastas que são: backend, frontend e mobile.
* <h3>Backend</h3>
Sendo assim deve primeiro acessar na pasta backend e executar a instalação para depois realizar a inicialização com os comandos:
```  cd backend
  // Instalação das dependencias:
  yarn install
  
  // Iniciar a aplicação
  yarn start
```
Com o backend rodando é possível realizar testes com as ferramentas do tipo postman/isominia ou executar o frontend.

* <h3>Frontend</h3>

Para Executar o frontend é preciso voltar para a pasta raiz mas, deve deixar o backend executando, então abra um outro terminal e navegue até a pasta frontend e execute os seguintes comandos:
```  cd frontend
  // Instalação das dependencias:
  yarn install
  
  // Iniciar a aplicação
  yarn start
```
* <h3>Mobile</h3>
No Mobile tem algumas formas diferentes para executar, no meu caso eu utilizei o dispositivo físico e o emulador android, irei listar algumas das formas de conectar:

* Com SDK executar: adb reverse tcp:3333 tcp:3333
* iOS com Emulador: localhost
* iOS com físico: IP da máquina
* Android com Emulador: localhost (adb resverse)
* Andorid com Emulador: 10.0.2.2 (Android Studio)
* Android com Emulador: 10.0.3.2 (Genymotion)
* Android com físico: IP da máquina (Utilizei essa forma)

O arquivo para ser alterado da api está na pasta <a href="https://github.com/edumoritz/test-mke/blob/master/mobile/src/services/api.js">service/api.js
</a>
```ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://{aqui deve colocar o host especifico}:3333/'
});

export default api;
```
Para executar o mobile é preciso navegar até a pasta mobile e executar os comandos:
```
  cd mobile
  // Instalação das dependencias:
  yarn install
  
  // Iniciar a aplicação
  yarn android // ou yarn ios
```

## Feedback

Feel free to send me feedback on [LinkedIn](https://www.linkedin.com/in/eduardo-moritz-5298a0118/) or [file an issue](https://github.com/edumoritz/test-mke). Feature requests are always welcome.

