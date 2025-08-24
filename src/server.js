// src/server.js
import 'dotenv/config';
import app from './app.js';

const PORT = process.env.APP_PORT || 3001;

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});

