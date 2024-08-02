const {DataTypes}= require('sequelize');
const sequelize = require ('../config/bd_config');

const Produit = sequelize.define("produits", {
    id_p: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    designation_p: {
        type: DataTypes.STRING(100),
    },
    categorie_p: {
        type: DataTypes.STRING(50),
    },
    photo_p: {
        type: DataTypes.STRING(255),
    },
    poid_p: {
        type: DataTypes.INTEGER,
    },
    prix_p: {
        type: DataTypes.INTEGER,
    }
});

module.exports = Produit;