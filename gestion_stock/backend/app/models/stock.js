const {DataTypes}= require('sequelize');
const sequelize = require ('../config/bd_config');
const { NOW } = require('sequelize');

// const produits = require('./produits');
// const depot = require('./depot');

const Stock = sequelize.define("stock", {
    id_st: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    qtt_st: {
        type: DataTypes.INTEGER,
    },
    id_p:{
        type: DataTypes.INTEGER,
        // references:{
        //     model: produits,
        //     key:'id_p'
        // }
    },
    id_dep:{
        type: DataTypes.INTEGER,
        // references:{
        //     model: depot,
        //     key:'id_dep'
        // }
    }
});

/*  Définition des relations entre les modèles 
    relation One to One
*/
// Stock.belongsTo(produits,{
//     foreignKey:'id_p',
//     as:'produit'
// })



// relation One to Many

// produits.hasMany(Stock,{
//     foreignKey:'id_p',
//     as:'stock',
// })
module.exports = Stock;