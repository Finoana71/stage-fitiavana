const {DataTypes}= require('sequelize');
const sequelize = require ('../config/bd_config');

const produits = require('./produits');
const depot = require('./depot');
const utilisateur = require('./utilisateur');

const Mouvement = sequelize.define("mouvement", {
    id_mvt: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    type_mvt: {
        type: DataTypes.STRING(50),
    },
    date_mvt: {
        type: DataTypes.DATE(),
    },
    qtt_mvt: {
        type: DataTypes.INTEGER,
    },
    id_p:{
        type: DataTypes.INTEGER,
        references:{
            model: produits,
            key:'id_p'
        }
    },
    id_dep:{
        type: DataTypes.INTEGER,
        references:{
            model: depot,
            key:'id_dep'
        }
    },
    id_ut:{
        type: DataTypes.INTEGER,
        references:{
            model: utilisateur,
            key:'id_ut'
        }
    }
});

/*  Définition des relations entre les modèles 
    relation One to One
*/
Mouvement.belongsTo(produits,{
    foreignKey:'id_p',
    as:'produit'
})

Mouvement.belongsTo(depot,{
    foreignKey:'id_dep',
    as:'depot'
})

Mouvement.belongsTo(utilisateur,{
    foreignKey:'id_ut',
    as:'utilisateur'
})

// relation One to Many

produits.hasMany(Mouvement,{
    foreignKey:'id_p',
    as:'mouvement',
})
module.exports = Mouvement;