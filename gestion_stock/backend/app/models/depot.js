const {DataTypes}= require('sequelize');
const sequelize = require ('../config/bd_config');

const Depot = sequelize.define("depot", {
    id_dep: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_dep: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true
    },
    limite_dep: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
});

module.exports = Depot;