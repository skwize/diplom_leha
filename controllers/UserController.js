const UsersModel = require("../database/Users");
const bcrypt = require("bcrypt")

async function CreateUser (req, res) {
    if (!req.body) return res.status(400).json("Нет данных");

    const { username, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const User = await UsersModel.create({
        username: username,
        password: hash
    });

    if (!User) return res.status(500).json("Ошибка создания пользователя");

    return res.status(201).json(User);
}

module.exports = {
    CreateUser
}