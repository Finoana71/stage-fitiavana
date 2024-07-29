
const mouvementRepository = require('../repository/mouvement.repository');
const stockRepository = require('../repository/stock.repository');

class mouvementService{

    async create(data){
        return await mouvementRepository.create(data)
    }

    async findAll (){
        return await stockRepository.findAll()
    }
    
    async getIdMouv(id){
        return await mouvementRepository.getIdMouv(id);
    }

    async createMouvement(id_p, id_dep, type_mvt, date_mvt, qtt_mvt, id_ut){
        
        let data = { id_p, id_dep, type_mvt, date_mvt, qtt_mvt, id_ut };
        //maka an'ilay depot sy prod
        let stock = await this.findStockByProdDep(id_dep, id_p); 

            if(stock != null){ //rah misy 
                stock = JSON.stringify(stock)
                stock = JSON.parse(stock)
                await this.updateStock_dep_pro(stock, qtt_mvt, type_mvt) // ataov n modif
            }
            
            else 
                await this.createNewStock(id_p, id_dep, qtt_mvt, type_mvt) //raha tss de mcreer
                        
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

        // if (stock.qtt_st < 0) {
        //     stock.qtt_st = 0
        // }

        await stockRepository.update(stock.id_st, stock)
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

        await stockRepository.create(data)
    }

    async findStockByProdDep(id_dep, id_p){
        return await stockRepository.findStockByProdDep(id_dep, id_p);
    }
    

    // async modification_stock(id_p, id_dep, type_mvt, date_mvt, qtt_mvt, id_ut){
          
    //     let data = { id_p, id_dep, type_mvt, date_mvt, qtt_mvt, id_ut };
    //     //maka an'ilay depot sy prod
    //     let stock = await this.findStockByProdDep(id_dep, id_p); 

    //     console.log("sdfqsdfqsdfqsdfq", stock);

    //         if(stock != null){ //rah misy 
    //             stock = JSON.stringify(stock)
    //             stock = JSON.parse(stock)
    //             await this.updateStock_modif(stock, qtt_mvt, type_mvt) // ataov n modif
    //         }

    //         else 
    //             await this.createNewStock(id_p, id_dep, qtt_mvt, type_mvt) //raha tss de mcreer
            
                
    //         if(data.qtt_mvt < 0)
    //             data.qtt_mvt = 0

    //     return await this.create(data)

    // }
    // async updateStock_modif(stock, qtt_mvt, type_mvt){
        
        
    //     if (type_mvt ==  "Entrer") {
    //         stock.qtt_st += qtt_mvt 
    //     }else {
    //         stock.qtt_st -= qtt_mvt 
    //     }

        
    //     if (stock.qtt_st < 0) {
    //         stock.qtt_st = 0

    //         if (stock.qtt_st == 0) {
    //             if (type_mvt="Entrer") 
    //                 stock.qtt_st += qtt_mvt
    //             else
    //                 stock.qtt_st -= qtt_mvt
    //         }
    //     }



    //     await stockRepository.update(stock.id_st, stock)
    // }
}


module.exports = new mouvementService();