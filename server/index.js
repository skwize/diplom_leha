const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./database/DatabaseConfig");
const UserModel = require("./database/Users");
const InventoryModel = require("./database/Inventory");
const UserRoutes = require("./routes/Users");
const InventoryRoutes = require("./routes/Inventory");
const AuthRoutes = require("./routes/Auth");


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use((req, res, next)=> {
    res.header({
        "Access-Control-Allow-Origin" : "*"
    });
    next();
})

async function SyncDbModels () {
    await UserModel.sync({alter: true});
    await InventoryModel.sync({force: true});
}

async function Connection () {
    await sequelize.authenticate().then(()=> {
        console.log("Db is configured");
    });
}

app.use([UserRoutes, AuthRoutes, InventoryRoutes]);

app.listen(8000, () => {
    console.log("Сервер запущен на порту: 8000");
    Connection();
    SyncDbModels();
});