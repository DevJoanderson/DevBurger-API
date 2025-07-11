import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer.js";
import authMiddleware from './App/middlewares/auth.js';


import UserController from "./App/controllers/UserController.js";
import SessionController from "./App/controllers/SessionController.js";
import ProductCrontroller from "./App/controllers/ProductCrontroller.js";
import CategoryCrontroller from "./App/controllers/CategoryCrontroller.js";
import OrderController from "./App/controllers/OrderController.js";

const routes = Router();

const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);

routes.use(authMiddleware);
routes.post("/products", upload.single("file"), ProductCrontroller.store);
routes.get("/products", authMiddleware, ProductCrontroller.index);
routes.put("/products/:id", upload.single("file"), ProductCrontroller.update);

routes.post("/categories", CategoryCrontroller.store);
routes.get("/categories", CategoryCrontroller.index);

routes.post("/orders", OrderController.store);
routes.get("/orders", OrderController.index);
routes.put("/orders/:id", OrderController.update);

export default routes;
 