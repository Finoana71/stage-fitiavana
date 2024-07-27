const stockRepository = require("../repository/stock.repository");

class stockService{
    
    async create(qtt_st, id_p, id_dep ){
        let data = {qtt_st, id_p, id_dep }

        if(data.qtt_st < 0)
            data.qtt_st = 0
        
        return stockRepository.create(data);
    }
    async delete(id){
        return stockRepository.delete(id);
    }
    async findAll(){
        return stockRepository.findAll();
    }
    async updateStock(id, data){
        
        return stockRepository.update(id,data);
    }
    // async findQttStockById(id,){
    //         return await stockRepository.findQttStockById();
    // }
    async getIdStock (id){
        return stockRepository.getIdStock(id);
    }
}

module.exports = new stockService();
