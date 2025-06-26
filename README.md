# 🍔 DevBurger API

API RESTful desenvolvida em Node.js com Express e PostgreSQL para simular o backend de um sistema de pedidos de uma hamburgueria digital.

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Sucrase](https://www.npmjs.com/package/sucrase)
- [pg (node-postgres)](https://node-postgres.com/)

---

## 🧱 Configuração do Ambiente

1. **Clone o repositório**
   ```bash
   git clone https://github.com/DevJoanderson/devburger-api.git
   cd devburger-api
2 Instale as dependências

bash
yarn install

3 Configure o banco com Docker

bash
docker-compose up -d

4 Crie o arquivo .env com as variáveis:

ini
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=devburger

5 Inicie o servidor

bash
yarn dev

📦 Scripts disponíveis
yarn dev: inicia o servidor com Sucrase + Nodemon

yarn start: inicia o servidor normalmente

🛠 Estrutura do Projeto
pgsql
devburger-api/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── routes.js
│   └── database/
│       └── database.js
├── docker-compose.yml
├── .env
├── .gitignore
└── package.json
🐞 Problemas resolvidos
Erro: password authentication failed for user "postgres"
🔍 Solução: Recriação do container com senha explícita e reset de senha dentro do PostgreSQL usando o terminal do Docker.

✍️ Autor
Joanderson Eustorgio Souza

GitHub
