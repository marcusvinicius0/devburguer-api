const { Router } = require("express");

const routes = new Router();

routes.get("/", (req, res) => {
  return res.send({ message: "Server online." });
})

module.exports = routes;