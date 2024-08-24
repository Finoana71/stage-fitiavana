const {DataTypes}= require('sequelize');
const sequelize = require ('../config/bd_config');

const depot = require('./depot');
// const stock = require('./stock');
// const mouvement = require('./mouvement');


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

// stock.belongsTo(depot, {foreignKey:'id_dep',as:'depot'})

// depot.hasMany(mouvement, {foreignKey:'id_dep',as:'mouvements'})


// mouvement.belongsTo(depot, {foreignKey:'id_dep',as:'depot'})

// produit.hasMany(mouvement, {foreignKey:'id_p',as:'mouvements'})
// mouvement.belongsTo(produit, {foreignKey:'id_p',as:'produit'})

// produit.hasMany(stock, {foreignKey:'id_p',as:'stocks'})
// stock.belongsTo(produit, {foreignKey:'id_p',as:'produit'})

module.exports = Produit;
