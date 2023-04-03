import * as Yup from "yup";
import User from "../models/User";

class SessionController {
   async store(req, res) {

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    const userEmailOrPasswordIncorrect = () => {
      return res.status(400).json({ error: "User email or password incorrect." });
    }

    if (!(await schema.isValid(req.body))) userEmailOrPasswordIncorrect();

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email: email },
    })

    if (!user) userEmailOrPasswordIncorrect();

    if (!(await user.checkPassword(password))) userEmailOrPasswordIncorrect();

    return res.json({
      id: user.id,
      email,
      name: user.name,
      admin: user.admin,
    })
  }
}

export default new SessionController();