
// métodos do controller
// não pode repetir os métodos dentro do mesmo controller

// store => cadastrar/adicionar
// index => listar vários
// show => listar apenas um
// update => atualizar
// delete => deletar

import { v4 } from "uuid";
import * as Yup from "yup";

import User from "../models/User";

class UserController {
  async store(req, res) {

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      admin: Yup.boolean(),
    })

    // if(!(await schema.isValid(req.body))) {
    //   return res.status(400).json({ error: "Make sure your data is correct "})
    // } // another way to validate

    try {
      await schema.validateSync(req.body, { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ error: error.errors })
    }

    const { name, email, password, admin } = req.body;

    const userExists = await User.findOne({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      admin
    });

    return res.status(201).json({ id: user.id, name, email, admin });
  }
}

export default new UserController();
