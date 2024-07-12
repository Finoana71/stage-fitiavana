const { log } = require('handlebars');
const Depot = require('../models/depot');
const Produit = require('../models/produits')
const stockService = require('../service/stock.service');

// Creer une Stock

exports.creerStock = async (req, res) =>{
    const {
        qtt_st,
        id_dep,
        id_p
    }= req.body

    try {        

        const produit = await Produit.findByPk(req.body.id_p);
        const depot = await Depot.findByPk(req.body.id_dep);

        if(!produit){
            return res.status(404).json({erreur:'Produit invalide'});
        }

        if(!depot){
            return res.status(404).json({erreur:'Depot invalide'});
        }

        
        const nouveStock = await stockService.create( qtt_st, id_p, id_dep);

        res.status(201).json({message:'Creation Stock avec succés', stock:nouveStock, produit, depot});
        
    } catch (erreur) {
        console.log(erreur);
        res.status(500).json({erreur:'Creation invalide'});
    }
}


//List Stock

exports.listeStock = async (req, res) =>{
    try {
        const stock = await stockService.findAll(); // mitovy oe jointure
        
        res.status(200).json(stock);

    } catch (erreur) {
        res.status(400).json({erreur});
    }
}

//List par Id Stock

exports.getIdStock = async (req, res) =>{
    try {
        const id  = req.params.id_st
        const stock = await stockService.getIdStock(id) 
        
        res.status(200).json(stock);

    } catch (erreur) {
        res.status(400).json({error});    
    }
}

// Supprimer le stock

exports.supprimerStock = async(req, res) =>{
    try {
        const id = req.params.id_st;
        console.log("idddd",id);

        const stock = await stockService.delete(id);
        console.log("sotck",stock);
        res.status(200).json({message:"Supprimer stock est avec succés", stocks : stock});
        
    } catch (erreur) {
        res.status(400).json({erreur:erreur.message});
    }
}

// Modification Stock

exports.modificationStock = async (req, res)=>{
    const id = req.params.id_st;
    const { qtt_st } = req.body;

    try {
        const [modification] = await stockService.updateStock(
            { qtt_st }, 
            { where:{ id_st:id}
        });

        if(!modification){
            return res.status(404).json({error :'Stock invalide'});
        }

        const modifStock = await Stock.findOne({ where: {id_st:id}});
        res.status(200).json({message:"Modification Stock est avec succés", stock:modifStock});
                
    } catch (erreur) {
        res.status(500).json({error :'Erreur Stock de produit'});
    }
}