
const mouvementRepository = require('../repository/mouvement.repository');
const stockRepository = require('../repository/stock.repository');

class mouvementService{
    async create(data){
        return await mouvementRepository.create(data)
    }

    async findAll (){
        return await stockRepository.findAll()
    }

    async createMouvement(id_p, id_dep, type_mvt, date_mvt, qtt_mvt, id_ut){
        
        let data = { id_p, id_dep, type_mvt, date_mvt, qtt_mvt, id_ut };
        let stock = await this.findStockByProdDep(id_dep, id_p); 


            if(stock != null){
                stock = JSON.stringify(stock)
                stock = JSON.parse(stock)
                await this.updateStock_dep_pro(stock, qtt_mvt, type_mvt)
            }
            
            else 
                await this.createNewStock(id_p, id_dep, qtt_mvt, type_mvt)
            
            if(data.qtt_mvt < 0)
                data.qtt_mvt = 0

        return await this.create(data)
    }

    async updateStock_dep_pro(stock, qtt_mvt, type_mvt){

        if (type_mvt ==  "Entrer") {
            stock.qtt_st+= qtt_mvt 
        }else {
            stock.qtt_st -= qtt_mvt 
        }
        if (stock.qtt_st < 0) {
            stock.qtt_st = 0
        }

        stockRepository.update(stock.id_st, stock)
    }

    async createNewStock(id_p, id_dep, qtt_mvt, type_mvt){
        let qtt_st 

            if (type_mvt == "Entrer") {
                qtt_st = qtt_mvt
                
            }                
            else {
                qtt_st = 0
            }
        const data = {qtt_st, id_p, id_dep }
                
        if (data.qtt_st<0)
            data.qtt_st = 0
        stockRepository.create(data)
    }

    async findStockByProdDep(id_dep, id_p){
        return await stockRepository.findStockByProdDep(id_dep, id_p);
    }
    async getIdMouv(id){
        return mouvementRepository.getIdMouv(id);
    }

}

module.exports = new mouvementService();