const depotRepository = require("../repository/depot.repository")

class depotSercie{
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
}
module.exports = new depotSercie();