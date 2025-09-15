# DevBurger API

Backend da aplicação **DevBurger**, desenvolvido em **Node.js (ESM)** com **Express**, **Sequelize**, **JWT**, **multer** para upload de imagens e integração de **pagamentos com Stripe**.

---

## ✨ Stack

* **Runtime:** Node.js 18+
* **Framework:** Express
* **ORM:** Sequelize (Postgres/MySQL/SQLite)
* **Autenticação:** JWT
* **Upload de arquivos:** multer (campo `file`)
* **Pagamentos:** Stripe (Payment Intents)

---

## 📦 Requisitos

* Node.js ≥ 18
* Yarn ou npm
* Banco de dados compatível com Sequelize (Postgres recomendado)
* Conta Stripe (chaves secret/public)

---

## ⚙️ Variáveis de ambiente

Arquivo `.env`:

```env
# Servidor
PORT=3001
APP_URL=http://localhost:3001

# JWT
JWT_SECRET=sua_chave_segura
JWT_EXPIRES_IN=7d

# Banco (Postgres)
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=devburger
DB_USER=user
DB_PASS=pass

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLIC_KEY=pk_test_xxx
```

---

## 🗂️ Estrutura de Pastas

```
src/
  App/
    controllers/
      UserController.js
      SessionController.js
      ProductController.js
      CategoryController.js
      OrderController.js
      stripe/
        CreatePaymentIntentController.js
    middlewares/
      auth.js
  config/
    multer.js
  database/
    models/
    migrations/
    seeders/
  routes.js
  app.js
server.js
uploads/
```

---

## 🚀 Como rodar localmente

```bash
# 1) Clone o projeto
git clone <URL_DO_REPO>
cd DevBurger-api

# 2) Instale dependências
yarn
# ou npm i

# 3) Configure o .env
cp .env.example .env

# 4) Rodar migrations
yarn sequelize db:migrate

# 5) Rodar seeders (opcional)
yarn sequelize db:seed:all

# 6) Iniciar servidor
yarn dev
```

A API sobe em `http://localhost:3001`.

---

## 🔗 Rotas

### Público

* `POST /users` → cria usuário
* `POST /session` → login (gera JWT)

### Protegido (authMiddleware)

#### Stripe

* `POST /create-payment-intent` → cria Payment Intent

#### Produtos

* `POST /products` → cria produto (upload imagem `file`)
* `GET /products` → lista
* `PUT /products/:id` → atualiza (upload opcional)

#### Categorias

* `POST /categories` → cria categoria
* `GET /categories` → lista
* `PUT /categories/:id` → atualiza

#### Pedidos

* `POST /orders` → cria pedido
* `GET /orders` → lista
* `PUT /orders/:id` → atualiza status

---

## ✅ Validação de payloads (Yup/Zod)

Recomendo validar o `req.body`/`req.query` em cada rota de escrita/leitura.

Exemplo com **yup** (produto):

```js
import * as yup from "yup";

export const productSchema = yup.object({
  name: yup.string().required().min(2),
  price: yup.number().required().positive(),
  category_id: yup.string().required(),
  offer: yup.boolean().default(false),
});

// no controller
const payload = await productSchema.validate(req.body, { abortEarly: false });
```

> Em caso de erro, retornar **400** com mensagens amigáveis.

---

## 🧯 Padronização de erros (middleware)

Crie um middleware de erro para unificar a resposta:

```js
// app.js
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const code = err.code || "INTERNAL_ERROR";
  const message = err.message || "Erro interno";
  return res.status(status).json({ error: { code, message } });
});
```

> Utilize `next({ status: 400, code: "VALIDATION_ERROR", message: "Preço inválido" })` nos controllers.

---

## 🔎 Paginação, busca e ordenação

Padrão recomendado para listagens:

```
GET /products?search=smash&category=lanche&page=1&limit=20&sort=price:asc
```

Resposta padrão:

```json
{
  "data": [ /* itens */ ],
  "page": 1,
  "limit": 20,
  "total": 123
}
```

---

## 🧾 Exemplos de requests/responses

### Criar produto (multipart)

```
POST /products
Authorization: Bearer <token>
Content-Type: multipart/form-data

fields:
  name=Combo Smash
  price=39.90
  category_id=<uuid>
  offer=true
file:
  file=<image/jpeg>
```

**201 Created**

```json
{
  "id": "p_123",
  "name": "Combo Smash",
  "price": 39.9,
  "imageUrl": "/uploads/1699999999-combo.jpg",
  "category": { "id": "c_1", "name": "Lanches" },
  "offer": true,
  "createdAt": "2025-09-15T12:34:56.000Z"
}
```

### Login

```
POST /session
{ "email": "user@dev.com", "password": "123456" }
```

**200 OK**

```json
{ "token": "<jwt>", "user": { "id": "u_1", "name": "Joanderson" } }
```

---

## 💳 Stripe – boas práticas

* **Webhook** `POST /stripe/webhook` para confirmar eventos (payment\_intent.succeeded, etc.).
* Use **idempotency key** ao criar Payment Intent (evita cobranças duplicadas).
* Calcule/valide o **total no backend**; nunca confie no valor vindo do cliente.

Exemplo de criação com idempotency:

```js
const intent = await stripe.paymentIntents.create(
  { amount, currency: "brl", metadata: { orderId } },
  { idempotencyKey: `order-${orderId}` }
);
```

---

## 🖼️ Upload mais seguro (multer)

* Defina **limits** de tamanho (ex.: 2MB) e **fileFilter** (jpg/png/webp):

```js
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype);
    cb(ok ? null : new Error("FILE_NOT_ALLOWED"), ok);
  }
});
```

* Gere nomes únicos e (opcional) subpastas por entidade.

---

## 🛡️ Segurança & Operação

* **helmet** e **cors** configurados.
* **rate limit** em rotas públicas (login, users, payment-intent).
* Logs com **morgan** (dev) ou **pino** (prod).
* Rota **/health** para monitoramento.

---

## 🧪 Testes

* **Jest/Vitest + Supertest** com cenários mínimos: login, criar produto, listar produtos.

---

## 🌱 Seeds úteis

* Categorias básicas e um produto demo para facilitar testes:

```bash
yarn sequelize db:seed:all
```

---

## 🐳 Docker (opcional)

Inclua `docker-compose.yml` com **app + Postgres** para subir tudo com:

```bash
docker compose up -d
```

---

## 🛣️ Roadmap

* [ ] Exemplos de request/response detalhados de todas as rotas
* [ ] Paginação e filtros em todas as listagens
* [ ] Upload em storage externo (S3/Cloudinary)
* [ ] Testes unitários e integração
* [ ] Deploy containerizado (Docker)

---

## 💬 Contribuição

Sinta-se à vontade para contribuir com melhorias, abrir issue ou enviar pull requests.

---

## 📄 Licença

Projeto com fins educacionais — por **DevBurger** 🍔
