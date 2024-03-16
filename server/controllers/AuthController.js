const UsersModel = require("../database/Users");
const bcrypt = require("bcrypt")

async function SignIn(req, res) {
    if(!req.body) return res.status(400).json({
        error: "Нет данных"
    });

    const { username, password } = req.body;

    const User = await UsersModel.findOne({
        where: {
            username: username
        }
    })

    if(!User) return res.status(404).json({
        error: "Пользователь не найден!"
    });

    if(await bcrypt.compare(password, User.password)){
        return res.status(200).json({
            authorized: true
        });
    }
    return res.status(403).json({
        error: "Нет доступа"
    });
}

module.exports = {
    SignIn
}