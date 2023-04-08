import * as Yup from "yup";

class OrderController {
  async store(req, res) {

    const schema = Yup.object().shape({
      products: Yup.array().required()
      .of(
        Yup.object().shape({
          id: Yup.number().required(),
          quantity: Yup.number().required(),
        })
      ),
    })

    try {
      await schema.validateSync(req.body, { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ error: error.errors })
    }

    return res.status(201).json(req.body);
  }
}

export default new OrderController();
