import * as Yup from "yup";

import Category from "../models/Category.js";
import User from "../models/User.js";

class CategoryController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });

      const { admin: isAdmin } = await User.findByPk(req.userId);
      if (!isAdmin) {
        return res.status(401).json({ error: "Acesso não autorizado." });
      }

      const path = req.file ? req.file.filename : null;
      const { name } = req.body;

      const categoryExists = await Category.findOne({ where: { name } });
      if (categoryExists) {
        return res.status(400).json({ error: "Categoria já existe." });
      }

      const { id } = await Category.create({ name, path });

      return res.status(201).json({ id, name });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar categoria." });
    }
  }

  async update(req, res) {
    const schema = Yup.object({
      name: Yup.string(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });

      const { admin: isAdmin } = await User.findByPk(req.userId);
      if (!isAdmin) {
        return res.status(401).json({ error: "Acesso não autorizado." });
      }

      const { id } = req.params;
      const categoryExists = await Category.findByPk(id);
      if (!categoryExists) {
        return res.status(400).json({ error: "ID da categoria inválido." });
      }

      const { name } = req.body;
      const path = req.file ? req.file.filename : categoryExists.path;

      if (name && name !== categoryExists.name) {
        const categoryNameExists = await Category.findOne({ where: { name } });
        if (categoryNameExists && categoryNameExists.id !== Number(id)) {
          return res
            .status(400)
            .json({ error: "Nome da categoria já existe." });
        }
      }

      await categoryExists.update({ name, path });

      return res
        .status(200)
        .json({ message: "Categoria atualizada com sucesso." });
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      return res.status(500).json({ error: "Erro ao atualizar categoria." });
    }
  }

  async index(req, res) {
    try {
      const categories = await Category.findAll();

      const formatted = categories.map((category) => ({
        id: category.id,
        name: category.name,
        path: category.path,
        url: category.url, // campo virtual
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      }));

      return res.json(formatted);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao listar categorias.",
        details: error.message,
      });
    }
  }
}

export default new CategoryController();
