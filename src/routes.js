import { Router } from "express";
import pool from "./config/database.cjs";
import User from "./app/models/User.js";
import { v4 } from "uuid";

const routes = Router();

routes.get("/", async (req, res) => {
  const user = await User.create({
 
    name: "joanderson",
    email: "joanderson@email.com",
    password_hash: "uwehriusbdg43w4",
    admin: false,
  });
  return res.status(201).json(user);
});

export default routes;
