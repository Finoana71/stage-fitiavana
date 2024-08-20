const { where } = require("sequelize")
const Stock = require("../models/Stock")
const stockService = require("../service/stock.service")
const Depot = require("../models/depot")

class stockRepository{
    async findById(id){
        return await Stock.findByPk(id)
    }
    async create(data){
        return await Stock.create(data)
    }
    async findAll(){
        return await Stock.findAll({include:['produit','depot']})
    }
    async update(id, data){
        const stock = await this.findById(id)
        if (stock) {
            return await Stock.update(data,{where:{id_st:id}});
        }
        return null
    }
    async delete (id){
        const stock = await this.findById(id)
        if (stock) {
            await Stock.destroy({where:{id_st:id}})
            return stock;
        }
    }

    async findStockByProdDep( id_dep, id_p ){
        return await Stock.findOne({where:{id_p, id_dep}})
    }
       
    async getIdStock(id){
        return Stock.findByPk(id, {include: ["produit", "depot"]})
    }
    
    async findAllDep_Pro(id_p, id_dep){
        return stockService.findAllDep_Pro(id_p, id_dep)
    }

    async updateNouveau(ancienIdDepot,nouvelValeurLimitDepot){

        await Depot.findByPk(ancienIdDepot);
        return await Depot.update(
            {   
                limite_dep: nouvelValeurLimitDepot
            }, 
            { where:{ id_dep: ancienIdDepot}
        });
    }

    
}

module.exports = new stockRepository();