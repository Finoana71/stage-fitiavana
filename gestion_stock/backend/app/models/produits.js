const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd_config');
const Stock = require('./stock');
// const Depot = require('./depot');
const Mouvement = require('./mouvement');

const Produit = sequelize.define("produits", {
    id_p: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    photo_p: {
        type: DataTypes.STRING(255),
    },
    designation_p: {
        type: DataTypes.STRING(100),
    },
    categorie_p: {
        type: DataTypes.STRING(50),
    },
    prix_p: {
        type: DataTypes.INTEGER,
    },
    longeur: {
        type: DataTypes.INTEGER,
    },
    largeur: {
        type: DataTypes.INTEGER,
    },
    hauteur: {
        type: DataTypes.INTEGER,
    },
    volume: {
        type: DataTypes.VIRTUAL, // Utilisation de DataTypes.VIRTUAL car ce champ est calculé
        get() {
            // Calcul du volume si longeur, largeur et hauteur sont définis
            const longeur = this.getDataValue('longeur');
            const largeur = this.getDataValue('largeur');
            const hauteur = this.getDataValue('hauteur');
            return longeur && largeur && hauteur ? longeur * largeur * hauteur : null;
        }
    }
    
});

Produit.hasMany(Stock, {foreignKey:'id_p', as:'stock'})
Produit.hasMany(Mouvement, {foreignKey:'id_p', as:'mouvement'})

Mouvement.belongsTo(Produit,{foreignKey:'id_p',as:'mouvement'})
Stock.belongsTo(Produit, {foreignKey:'id_p',as:'stock'})
Mouvement.belongsTo(Produit,{foreignKey:'id_p',as:'produit'})
Stock.belongsTo(Produit, {foreignKey:'id_p',as:'produit'})


module.exports = Produit;
