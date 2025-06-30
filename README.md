# 🍔 DevBurger API

API RESTful para gerenciamento de usuários e produtos, com autenticação JWT, upload de imagens com `multer`, e banco de dados relacional com Sequelize.

---

## 🚀 Tecnologias utilizadas

- **Node.js**
- **Express**
- **Sequelize (ORM)**
- **PostgreSQL**
- **JWT (autenticação)**
- **Multer (upload de arquivos)**
- **UUID (geração de IDs únicos)**
- **Yup (validação de dados)**

---

## 📁 Estrutura de pastas

src/
├── App/
│ ├── controllers/
│ │ ├── SessionController.js
│ │ ├── UserController.js
│ │ └── ProductController.js
│ ├── models/
│ │ └── User.js
│
├── config/
│ ├── database.cjs
│ └── multer.js
│
├── database/
│ └── migrations/
│ ├── create-users-table.js
│ └── create-products-table.js
│
├── uploads/ # Arquivos enviados (imagens de produtos)
├── routes.js
├── server.js

yaml
Copiar
Editar

---

## 🔐 Autenticação

Autenticação via JWT. Após o login, a API retorna um token válido por 7 dias.

---

## 📦 Funcionalidades principais

- ✅ Cadastro de usuários  
- ✅ Login de usuários (JWT)  
- ✅ Cadastro de produtos com upload de imagem  
- ✅ Hash de senha com bcrypt  
- ✅ Validação de dados com Yup  
- ✅ Migrations com Sequelize CLI

---

## 🔄 Rotas disponíveis

| Método | Rota           | Descrição                          |
|--------|----------------|------------------------------------|
| POST   | `/users`       | Cadastrar usuário                  |
| POST   | `/session`     | Login do usuário (retorna token)   |
| POST   | `/products`    | Cadastrar produto (com imagem)     |

---

## 📤 Upload de arquivos

Os arquivos são armazenados na pasta `/uploads` e renomeados com `uuid` + extensão original, para evitar conflitos de nomes.

---

## 🧪 Como rodar o projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/DevBurger-api.git
Instale as dependências:

bash
Copiar
Editar
yarn
Configure o arquivo .env:

ini
Copiar
Editar
DB_NAME=seu_banco
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_HOST=localhost
JWT_SECRET=suachavesecreta
Rode as migrations:

bash
Copiar
Editar
yarn sequelize db:migrate
Inicie o servidor:

bash
Copiar
Editar
yarn dev
💬 Contribuição
Sinta-se à vontade para contribuir com melhorias, abrir issues ou enviar pull requests.

📄 Licença
Projeto com fins educacionais — por DevBurger 🍔
