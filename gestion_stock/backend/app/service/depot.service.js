const { Op } = require("sequelize");
const Depot = require("../models/depot");
const depotRepository = require("../repository/depot.repository")

class depotSercie{
    async findById(id){
        return await depotRepository.findById(id);
    }
    async create(data){
        return depotRepository.create(data);
    }
    async delete(id){
        return depotRepository.delete(id);
    }
    async findAll(){
        return depotRepository.findAll();
    }
    async putDepot(id,data){
        return depotRepository.update(id, data);
    }
    async getDepotByID(id){
        return depotRepository.findById(id);
    }

    async findSupperieurAncienLimite(id_dep,qtt_mvt){

        await depotRepository.findById(id_dep);
        return await Depot.findAll({  
                where: {
                    limite_dep: {
                        [Op.gte]: qtt_mvt
                    }
                }
            })
        
    }
}
module.exports = new depotSercie();