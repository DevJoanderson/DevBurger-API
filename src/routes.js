import { Router } from "express";
import multer from "multer";

import multerConfig from "./config/multer.js";

import authMiddleware from "./App/middlewares/auth.js";

import UserController from "./App/controllers/UserController.js";
import SessionController from "./App/controllers/SessionController.js";
import ProductCrontroller from "./App/controllers/ProductCrontroller.js";
import CategoryController from "./App/controllers/CategoryCrontroller.js";
import OrderController from "./App/controllers/OrderController.js";

import CreatePaymentIntentController from "./App/controllers/stripe/CreatePaymentIntentController.js";

const routes = Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);

routes.use(authMiddleware);

routes.post("/create-payment-intent", CreatePaymentIntentController.store);

routes.post("/products", upload.single("file"), ProductCrontroller.store);
routes.get("/products", ProductCrontroller.index);
routes.put("/products/:id", upload.single("file"), ProductCrontroller.update);

routes.post("/categories", upload.single("file"), CategoryController.store);
routes.get("/categories", CategoryController.index);
routes.put("/categories/:id", upload.single("file"), CategoryController.update);

routes.post("/orders", OrderController.store);
routes.get("/orders", OrderController.index);
routes.put("/orders/:id", OrderController.update);

export default routes;
