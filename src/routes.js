import { Router } from 'express';
import pool from './database/database.js';


const routes = Router();

routes.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    return res.json({ message: 'Hello World!', dbTime: result.rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Database error' });
  }
});

export default routes;
