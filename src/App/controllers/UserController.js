import User from "../models/User.js";

import { v4 } from "uuid";

class UserController {
  async store(req, res) {
    const { name, email,  password_hash, admin} = req.body;

    const user = await User.create({
      name,
      email,
      password_hash,
      admin,
    });
    return res.status(201).json({
        id: user.id,
        name,
        email,
        admin,
    });
  }
}

export default new UserController();
