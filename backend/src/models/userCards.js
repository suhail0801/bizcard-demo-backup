const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const UserCards = sequelize.define("UserCards", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users", // reference User model
            key: 'id'
        }
    },
    templateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'CardTemplates', 
            key: 'id'
        }
    },
    cardData: {
        type: DataTypes.JSON,
        allowNull: false,
    },
});

module.exports = UserCards;