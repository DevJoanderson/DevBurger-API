import multer from "multer";
import { extname, resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

// Gerar __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: resolve(__dirname, "..", "..", "uploads"),
  filename: (req, file, callback) => {
    callback(null, uuidv4() + extname(file.originalname));
  },
});

export default multer({ storage });
