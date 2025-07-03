import * as Yup from "yup";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import authConfg from '../../config/auth.js'

class SessionController {
  async store(req, res) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });
    const isValid = await schema.isValid(req.body);

    const emailOrPasswordIncorrect = () => {
      res
        .status(401)
        .json({ error: "Make sure your email or password is correct" });
    };

    if (!isValid) {
      return emailOrPasswordIncorrect();
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return emailOrPasswordIncorrect();
    }

    const isSamePassword = await user.comparePassword(password);

    if (!isSamePassword) {
      return emailOrPasswordIncorrect();
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // token expira em 7 dias
    });

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        token: jwt.sign({ id: user.id}, authConfg.secret, {
          expiresIn: authConfg.expiresIn  ,
        })
      },
      
    });
  }
}

export default new SessionController();
