const { read } = require("../controllers/flights");
const auth = require("../middleware/auth");

const Router = require("express").Router();

Router.get("/flights/", auth, read);

module.exports = Router;
