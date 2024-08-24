const {DataTypes}= require('sequelize');
const sequelize = require ('../config/bd_config');

// const Mouvement = require('./mouvement');

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

// Mouvement.belongsTo(Depot,{
//     foreignKey:'id_dep',
//     as:'depot'
// })

module.exports = Depot;