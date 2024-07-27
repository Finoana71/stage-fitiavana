const Depot = require('../models/depot');
const Mouvement = require('../models/mouvement');
const Produit = require('../models/produits');
const Stock = require('../models/Stock');
const Utilisateur = require('../models/utilisateur');
const mouvementService = require('../service/mouvement.service');
const { supprimerProduit } = require('./produitController');

// Creer une Stock

exports.creerMouvement = async (req, res) =>{

    const id = req.params.id_mvt
    const id_ut = req.user

    const {
        id_p,
        id_dep, 
        type_mvt, 
        qtt_mvt,
        date_mvt
        } =  req.body
    try {
        
        const utilisateur = await Utilisateur.findByPk(id_ut);
        const depot = await Depot.findByPk(req.body.id_dep);
        const produit = await Produit.findByPk(req.body.id_p);

        if(!utilisateur){
            return res.status(404).json({erreur:'utilisateur invalide'});
        }

        if(!depot){
            return res.status(404).json({erreur:'Depot invalide'});
        }

        if(!produit){
            return res.status(404).json({erreur:'produit invalide'});
        }

        const nouveMouvement = await mouvementService.createMouvement(
            id_p, id_dep, type_mvt, date_mvt, qtt_mvt, id_ut,id
        );


        // const nouveMouvement = await Mouvement.create(req.body);
        res.status(201).json({message:'Creation Stock avec succés', mouvement:nouveMouvement, utilisateur, depot, produit});
        // res.status(201).json(nouveMouvement, utilisateur, depot, produit);
    
    } catch (erreur) {
        console.log(erreur);
        res.status(500).json({erreur:'Creation invalide'});
    }

}

//List Mouvement

exports.listeMouvement = async (req, res) =>{
    try {
        const mouvement = await Mouvement.findAll({include:['produit','depot','utilisateur']});
        res.status(200).json(mouvement);

    } catch (erreur) {
        res.status(400).json({erreur:erreur.message});
    }
}

//List par Id mouvement

exports.getIdMouv = async (req, res) =>{
    
    try {
        const id  = req.params.id_mvt
        const mouvement = await mouvementService.getIdMouv(id) 
        
        res.status(200).json(mouvement);

    } catch (erreur) {
        res.status(400).json({error : 'cette id mouvement est vide' });    
    }

}

//Supprimer Mouvement

exports.supprimerMouvement = async (req, res) =>{
    try {
        const id = req.params.id_mvt;
        const mouvement = await Mouvement.destroy({where:{id_mvt:id}});
        res.status(200).json(mouvement);

    } catch (erreur) {
        res.status(400).json({erreur:erreur.message});
    }
}

// Modification Mouvement

exports.modificationMouvement = async (req, res)=>{
    const id = req.params.id_mvt;
    const { type_mvt, date_mvt, qtt_mvt, id_dep, id_p } = req.body;

    try {
        const [modification] = await Mouvement.update(
            { type_mvt, date_mvt, qtt_mvt, id_dep, id_p }, 
            { where:{ id_mvt:id}
        });

        if(!modification){
            return res.status(404).json({error : 'Mouvement invalide'});
        }

        const modifMouvement = await Mouvement.findOne({ 
            where: {id_mvt:id},
            include:['produit','depot','utilisateur']
        });

        
        res.status(200).json({message:"Modification Mouvement est avec succés", mouvement:modifMouvement});
                
    } catch (erreur) {
        res.status(500).json({error : 'Erreur Mouvement de produit'});
    }
}


