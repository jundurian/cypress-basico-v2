# Cypress Basico v2

---

Repo criado com o código dos estudos da segunda versão do [curso básico de Cypress](https://www.udemy.com/course/testes-automatizados-com-cypress-basico/) da escola [Talking About Testing](https://talkingabouttesting.com/) no Udemy.
Curso ministrado por [Walmyr Lima e Silva Filho](https://walmyr.dev/)

Link do github original do curso: https://github.com/wlsf82/cypress-basico-v2#readme


## Alguns conceitos do curso

- Comandos Cypress
  - Get
  - Title
  - Type
  - Clock / Tick
  - Should
  - And
  - Contains
  - SelectFile
  - Invoke
  - Request
- Comandos Customizados
- Fixtures

## Tools usadas
- [Cypress](https://www.cypress.io/) - 9.5.2
- [NodeJS](https://nodejs.org/en/) - 16.14.0
- JavaScript
- [Visual Studio Code](https://code.visualstudio.com/)

## Setup

Após instalar o NodeJS, faça o clone do repo.
Navegue para a pasta do projeto e execute o seguinte comando para instalar as dependências:

`npm install`

## Como rodar

- Modo interativo -> `npm run cy:open`
- Modo interativo viewport Mobile -> `npm run cy:open: mobile`
- Modo headless (sem abrir o navegador) -> `npm run test`
- Modo headless viewport Mobile -> `npm run test:mobile`

