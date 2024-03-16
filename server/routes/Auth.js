const express = require("express");
const controller = require("../controllers/AuthController");

const router = express.Router();

router.post("/auth/signin", controller.SignIn)

module.exports = router;