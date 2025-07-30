import * as Yup from "yup";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authConfig from "../../config/auth.js"; // nome corrigido para consistência

class SessionController {
  async store(req, res) {
    // Validação dos campos
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const isValid = await schema.isValid(req.body);

    const emailOrPasswordIncorrect = () =>
      res.status(401).json({ error: "Make sure your email or password is correct" });

    if (!isValid) {
      return emailOrPasswordIncorrect();
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return emailOrPasswordIncorrect();
    }

    const isSamePassword = await user.comparePassword(password);

    if (!isSamePassword) {
      return emailOrPasswordIncorrect();
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn, // geralmente '7d'
    });

    // Resposta correta: token no nível raiz
    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
      },
      token, // ← agora o frontend pode acessar diretamente
    });
  }
}

export default new SessionController();
