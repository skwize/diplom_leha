const sequelize = require("./DatabaseConfig");
const { DataTypes } = require("sequelize");

const Inventory = sequelize.define("Inventory", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    inventory_type: {
        type: DataTypes.STRING,
        allowNull: false
    },

    inventory_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    position: {
        type: DataTypes.STRING,
        allowNull: true
    },

    responsible: {
        type: DataTypes.STRING,
        allowNull: false
    },

    resPhone: {
        type: DataTypes.STRING,
        allowNull: false
    },

    status: {
        type: DataTypes.STRING,
        defaultValue: "Исправен"
    }
})

module.exports = Inventory