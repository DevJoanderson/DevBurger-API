import { Router } from "express";
import UserController from "./App/controllers/UserController.js";
import SessionController from "./App/controllers/SessionController.js"



const routes = Router();

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);

export default routes;
