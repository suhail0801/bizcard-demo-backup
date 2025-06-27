const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const CardData = sequelize.define("CardData", {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    card_data: {
        type: DataTypes.JSON,
        allowNull: false,
    },
});

module.exports = CardData;
