const { Sequelize } = require("sequelize");


const sequelize = new Sequelize({
    host: "localhost",
    username: "postgres",
    password: "postgres",
    dialect: "postgres",
    database: "80_Dolgov",
    logging: false
})

module.exports = sequelize;