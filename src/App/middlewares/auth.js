import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';
import User from '../models/User.js';

export default async function authMiddleware(req, res, next) {
  const authToken = req.headers.authorization;
  if (!authToken) return res.status(401).json({ error: 'Token not provided' });

  const token = authToken.split(' ').at(1);

  try {
    const decoded = jwt.verify(token, authConfig.secret); // { id: ... }
    req.userId = decoded.id;

    // garanta que o nome vem do banco:
    const user = await User.findByPk(req.userId, { attributes: ['name'] });
    if (!user) return res.status(401).json({ error: 'User not found' });

    req.userName = user.name;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token is invalid' });
  }
}

