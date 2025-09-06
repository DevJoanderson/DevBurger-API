import * as Yup from "yup";
import Order from "../schemas/Order.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import User from "../models/User.js"; 
class OrderController {
  async store(req, res) {
    const schema = Yup.object({
      products: Yup.array()
        .required()
        .of(
          Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          })
        ),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { products } = req.body;
    const productsIds = products.map((product) => product.id);

    const findProducts = await Product.findAll({
      where: { id: productsIds },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
    });

    const formattedProducts = findProducts
      .map((product) => {
        const productIndex = products.findIndex(
          (item) => item.id === product.id
        );
        if (productIndex === -1) return null;

        return {
          id: product.id,
          name: product.name,
          category: product.category?.name ?? null,

          price: product.price,
          url: product.url,
          quantity: products[productIndex].quantity,
        };
      })
      .filter(Boolean);

    const order = {
      user: {
        id: req.userId,
        name: req.userName,
      },
      products: formattedProducts,
      status: "Pedido Realizado!",
    };
    console.log(req.userId, req.userName)
    const createdOrder = await Order.create(order);

    return res.status(201).json(createdOrder);
  }

  async index(req, res) {
    const orders = await Order.find();
    return res.json(orders);
  }

  async update(req, res) {
  const schema = Yup.object({
    status: Yup.string().required(),
  });

  try {
    schema.validateSync(req.body, { abortEarly: false });
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }

  const { admin: isAdmin } = await User.findByPk(req.userId);
  if (!isAdmin) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.params;
  const { status } = req.body;

  try {
    
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true } 
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    return res.json(updatedOrder);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
}

export default new OrderController();
