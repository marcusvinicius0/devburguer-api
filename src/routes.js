import { Router } from "express";

const routes = new Router();

routes.get("/", (req, res) => res.send({ message: "Server online." }));

export default routes;
