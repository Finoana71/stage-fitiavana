
const Depot = require('../models/depot')

class depotRepository{
    
    async findById(id){
        return await Depot.findByPk(id);
    }
    async delete(id){
        const depot = await this.findById(id);
        if (depot) {
            await Depot.destroy({where:{id_dep:id}});
            return depot;
            
        }
        return null;
    }
    async create(data){
        
        return await Depot.create(data);
    }
    async findAll(){
        return await Depot.findAll();
    }
    async update(id, data){
        const depot = await this.findById(id);
        if (depot) {
            await Depot.update(data);
            return depot;
        }
        return null;
    }
}

module.exports = new depotRepository();