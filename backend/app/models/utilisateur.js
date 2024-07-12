const {DataTypes}= require('sequelize');
const sequelize = require ('../config/bd_config');

const Utilisateur = sequelize.define("utilisateur", {
    id_ut: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email_ut: {
        type: DataTypes.STRING(200),
        allowNull: true,
        unique: true
    },
    mdp_ut : {
        type : DataTypes.STRING(100),
        allowNull: true
    }
    
});

module.exports = Utilisateur;