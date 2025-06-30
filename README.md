# 🍔 DevBurger API

API REST construída com Node.js, Express e Sequelize para gerenciamento de usuários e produtos de uma hamburgueria fictícia.

---

## 🚀 Funcionalidades

- ✅ Cadastro de usuários
- ✅ Login com autenticação via JWT
- ✅ Hash de senhas com bcrypt
- ✅ Criação de produtos (nome, preço, categoria, imagem)
- ✅ Controle de administrador (`admin`)
- ✅ Migrations com Sequelize
- ✅ Validação com Yup

---


## 🧰 Tecnologias utilizadas

- Node.js
- Express
- Sequelize ORM
- PostgreSQL
- JWT (Json Web Token)
- Bcrypt
- dotenv
- Yup

---

## 📦 Instalação

```bash
git clone https://github.com/seu-usuario/2DevBurger-api.git
cd 2DevBurger-api
yarn install

⚙️ Configuração
Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

env
APP_URL=http://localhost:3001
JWT_SECRET=sua_chave_secreta
DB_USER=seu_usuario_postgres
DB_PASS=sua_senha
DB_NAME=devburger
DB_HOST=localhost
🧬 Rodando as migrations
bash

yarn sequelize db:migrate
▶️ Iniciando o servidor
bash
Copiar
Editar
yarn dev
O servidor será iniciado em: http://localhost:3001

📮 Rotas disponíveis
🔐 Sessão (Login)
POST /session

json

{
  "email": "usuario@email.com",
  "password": "suasenha"
}
Retorno:

json

{
  "user": {
    "id": "uuid",
    "name": "Usuário",
    "email": "usuario@email.com",
    "admin": false
  },
  "token": "jwt_token"
}
📁 Estrutura de pastas
pgsql

src
├── app
│   ├── controllers
│   ├── models
├── config
│   └── database.cjs
├── database
│   ├── migrations
├── routes.js
└── server.js
🧑‍💻 Autor
Joanderson Souza
