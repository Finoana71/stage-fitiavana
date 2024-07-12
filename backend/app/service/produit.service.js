
const pathProductImage = "./public/image/upload/produit/";
const produitRepository = require('../repository/produit.repository')

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
    async getProduits(){
        return await produitRepository.findAll();
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
}
module.exports = new produitService();