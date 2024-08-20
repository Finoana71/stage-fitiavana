
const pathProductImage = "./public/image/upload/produit/";
const produitRepository = require('../repository/produit.repository')
const helper = require('../helper/file.helper')
const path = require('path');
const { Op } = require('sequelize');
const Produit = require('../models/produits');

function uploadPhotoProduit(file) {
    // creer chemin 
    if (!file) {
        return pathProductImage;
    }
}

class produitService{
    async createProduit(data){

        return await produitRepository.create(data);
    }
    async getProduits(page){
        return await produitRepository.findAll(page);
    }
    async putProduits(id, data){
        return await produitRepository.update(id, data);
    }
    async deleteProduits(id){
        return await produitRepository.delete(id);
    }
    async count(){
        return await produitRepository.count();
    }

    async uploadFile(file, photo_p){

        try {
            const pathFile = photo_p;
    
            // Créer un chemin en utilisant path.join
            const directoryPath = path.join(__dirname,'../uploads/', pathFile);
            console.log(directoryPath); // Affiche le chemin complet du répertoire 'uploads'
    
            await helper.uploadFileAsync(file, directoryPath)
            return pathFile;

        } catch (error) {
            console.log("erreur", error);   
        }

    }

    // recherche
    async searchUsersByName(designation) {
        try {
          const users = await Produit.findAll({
            where: {
                designation_p: {
                [Op.like]: `%${designation}%`
              }
            }
          });
          return users;
        } catch (error) {
          throw error;
        }
      }
    
}
module.exports = new produitService();