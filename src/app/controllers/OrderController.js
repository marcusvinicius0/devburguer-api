import * as Yup from "yup";
import Product from "../models/Product";
import Category from "../models/Category";
import Order from "../schemas/Order";
class OrderController {
  // async store(req, res) {

  //   const schema = Yup.object().shape({
  //     products: Yup.array().required()
  //     .of(
  //       Yup.object().shape({
  //         id: Yup.number().required(),
  //         quantity: Yup.number().required(),
  //       })
  //     ),
  //   })

  //   try {
  //     await schema.validateSync(req.body, { abortEarly: false })
  //   } catch (error) {
  //     return res.status(400).json({ error: error.errors })
  //   }

  //   const productsId = req.body.products.map((product) => product.id);

  //   const updatedProducts = await Product.findAll({
  //     where: {
  //       id: productsId,
  //     },
  //     include: [
  //       {
  //         model: Category,
  //         as: 'category',
  //         attributes: ['name'],
  //       }
  //     ]
  //   })

  //   const editedProducts = updatedProducts.map(product => {
  //     const productsIndex = req.body.products.findIndex(requestProduct => requestProduct.id === product.id);

  //     const newProduct = {
  //       id: product.id,
  //       name: product.name,
  //       price: product.price,
  //       category: product.category.name,
  //       url: product.url,
  //       quantity: req.body.products[productsIndex].quantity,
  //     };

  //     return newProduct;
  //   })

  //   const order = {
  //     user: {
  //       id: req.userId,
  //       name: req.userName,
  //     },
  //     products: editedProducts,
  //     status: 'Pedido realizado',
  //   }

  //   const orderResponse = await Order.create(order);

  //   return res.status(201).json(orderResponse);
  // }
  async store(request, response) {
    const schema = Yup.object().shape({
      products: Yup.array()
        .required()
        .of(
          Yup.object().shape({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          })
        ),
    });

    try {
      await schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const productsId = request.body.products.map((product) => product.id);

    const updatedProducts = await Product.findAll({
      where: {
        id: productsId,
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    const editedProduct = updatedProducts.map((product) => {
      const productIndex = request.body.products.findIndex(
        (requestProduct) => requestProduct.id === product.id
      );

      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category.name,
        url: product.url,
        quantity: request.body.products[productIndex].quantity,
      };

      return newProduct;
    });

    const order = {
      user: {
        id: request.userId,
        name: request.userName,
      },
      products: editedProduct,
      status: "Pedido realizado",
    };

    const orderResponse = await Order.create(order);

    return response.status(201).json(orderResponse);
  }
}

export default new OrderController();
