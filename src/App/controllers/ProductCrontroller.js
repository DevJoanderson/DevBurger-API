import * as Yup from "yup";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import User from "../models/User.js";

class ProductController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(req.userId);
    if (!isAdmin) {
      return res.status(401).json({ error: "Usuário não autorizado" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Imagem do produto é obrigatória" });
    }

    const { filename: path } = req.file;
    const { name, price, category_id, offer } = req.body;

    const product = await Product.create({
      name,
      price,
      category_id,
      path,
      offer,
    });

    return res.status(201).json({ product });
  }

  async update(req, res) {
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(req.userId);
    if (!isAdmin) {
      return res.status(401).json({ error: "Usuário não autorizado" });
    }

    const { id } = req.params;
    const findProduct = await Product.findByPk(id);

    if (!findProduct) {
      return res.status(400).json({ error: "Produto não encontrado" });
    }

    let path;
    if (req.file) {
      path = req.file.filename;
    } else {
      path = findProduct.path;
    }

    const { name, price, category_id, offer } = req.body;

    await findProduct.update({
      name: name ?? findProduct.name,
      price: price ?? findProduct.price,
      category_id: category_id ?? findProduct.category_id,
      path,
      offer: offer ?? findProduct.offer,
    });

    return res.status(200).json({ message: "Produto atualizado com sucesso" });
  }

  async index(req, res) {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
    });

    return res.json(products);
  }
}

export default new ProductController();

