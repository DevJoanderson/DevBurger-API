import { Router } from "express";
import pool from "./config/database.cjs";
import UserController from "./App/controllers/UserController.js";



const routes = Router();

routes.post("/users", UserController.store);
 

export default routes;
