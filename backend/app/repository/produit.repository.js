
const Produit = require('../models/produits')

class produitRepository{
    async findById(id){
        return await Produit.findByPk(id);
    }
    async create(data){
        return await Produit.create(data);
    }
    async findAll(){
        return await Produit.findAll();
    }
    async update(id, data){
        const produit = await this.findById(id);
        if (produit) {
            return await Produit.update(data);
        }
        return null;
    }
    async delete(id){
        const produit = await this.findById(id);
        if (produit) {
            await Produit.destroy({where:{id_p:id}});
            console.log(produit);
            return produit;
        }
        return null;
    }
    async count(){
        return await Produit.count();
    }
}
module.exports= new produitRepository();