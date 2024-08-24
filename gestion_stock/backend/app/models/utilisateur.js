const {DataTypes}= require('sequelize');
const sequelize = require ('../config/bd_config');
const Mouvement = require('./mouvement');

const Utilisateur = sequelize.define("utilisateur", {
    id_ut: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    role: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    email_ut: {
        type: DataTypes.STRING(200),
        allowNull: true,
        unique: true
    },
    mdp_ut : {
        type : DataTypes.STRING(200),
        allowNull: true
    }
    
});


module.exports = Utilisateur;