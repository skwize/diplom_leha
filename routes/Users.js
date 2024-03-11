const express = require("express");
const controller = require("../controllers/UserController");

const router = express.Router();

router.post("/users/create", controller.CreateUser);

module.exports = router;