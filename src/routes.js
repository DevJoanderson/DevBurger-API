import { Router } from "express";
import UserController from "./App/controllers/UserController.js";
import SessionController from "./App/controllers/SessionController.js"
import ProductCrontroller from "./App/controllers/ProductCrontroller.js";



const routes = Router();

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);
routes.post("/products", ProductCrontroller.store);

export default routes;
