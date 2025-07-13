import * as Yup from "yup";
import Category from "../models/Category.js";
import User from "../models/User.js";

class CategoryController {async store(req, res) {
  const schema = Yup.object({
    name: Yup.string().required(),
  });

  try {
    schema.validateSync(req.body, { abortEarly: false });

    const { admin: isAdmin } = await User.findByPk(req.userId);
    if (!isAdmin) {
      return res.status(401).json({ error: "Acesso não autorizado." });
    }

    const { filename: path } = req.file;
    const { name } = req.body;

    const categoriesExists = await Category.findOne({ where: { name } });
    if (categoriesExists) {
      return res.status(400).json({ error: "Categoria já existe." });
    }

    const { id } = await Category.create({ name, path });
    return res.status(201).json({ id, name });

  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    return res.status(500).json({ error: "Erro interno ao criar categoria.", details: error.message });
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
    const categoryExists = await Category.findBypk(id);

    if (!categoryExists) {
      return res.status(400).json({ message: "Make sure your category ID is correct."});
    }

    let path;
    if (!findProduct) {
      path = req.file.filename;
    }

    const { name } = req.body;
    
    if (name) {
      const categoryNameExists = await Category.findOne({
        where: {
          name,
        }
      })

      if (categoryNameExists) {
        return res.status(400).json({ error: "category already exists"})
      }
    }
    

    await Category.update({  
      name,  
      path,
    },{
      where: { 
        id,
      }
    })
  

  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    return res.status(500).json({ error: "Erro interno ao criar categoria.", details: error.message });
  }

  async index(req, res) {
    const categories = await Category.findAll();
    return res.json(categories);
  }
}

export default new CategoryController();
