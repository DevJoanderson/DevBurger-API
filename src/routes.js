import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer.js";

import UserController from "./App/controllers/UserController.js";
import SessionController from "./App/controllers/SessionController.js";
import ProductCrontroller from "./App/controllers/ProductCrontroller.js";

const routes = Router();

const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);
routes.post("/products", upload.single("file"), ProductCrontroller.store);
routes.get("/products", ProductCrontroller.index);

export default routes;
