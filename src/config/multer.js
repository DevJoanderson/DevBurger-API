import multer from "multer";
import { extname, resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import { v4 } from "uuid";

// Gerar __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, "..", "..", "uploads"),
    filename: (req, file, callback) =>
      callback(null, v4() + extname(file.originalname)),
  }),
};
