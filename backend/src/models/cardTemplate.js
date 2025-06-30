const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const CardTemplate = sequelize.define("CardTemplate", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    JSON:{
        type:DataTypes.JSON,
        allowNull:false,
    },
    html_content: {
        type: DataTypes.TEXT, 
        allowNull: true,  
    }
});

module.exports = CardTemplate;
