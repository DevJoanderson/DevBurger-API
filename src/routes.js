// src/routes.js
import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer.js';

// Middlewares
import authMiddleware from './App/middlewares/auth.js';

// Controllers
import UserController from './App/controllers/UserController.js';
import SessionController from './App/controllers/SessionController.js';
import ProductCrontroller from './App/controllers/ProductCrontroller.js';
import CategoryController from './App/controllers/CategoryCrontroller.js';
import OrderController from './App/controllers/OrderController.js';

// Stripe
import CreatePaymentIntentController from './App/controllers/stripe/CreatePaymentIntentController.js';

const routes = Router();
const upload = multer(multerConfig);

// ---------- Públicas ----------
routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);



// ---------- Privadas ----------
routes.use(authMiddleware);


routes.post('/create-payment-intent', CreatePaymentIntentController.store);

// Produtos
routes.post('/products', upload.single('file'), ProductCrontroller.store);
routes.get('/products', ProductCrontroller.index);
routes.put('/products/:id', upload.single('file'), ProductCrontroller.update);

// Categorias
routes.post('/categories', upload.single('file'), CategoryController.store);
routes.get('/categories', CategoryController.index);
routes.put('/categories/:id', upload.single('file'), CategoryController.update);

// Pedidos
routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);

export default routes;
