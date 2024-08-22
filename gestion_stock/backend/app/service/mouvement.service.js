
const { Op, json, Error } = require('sequelize');
const Depot = require('../models/depot');
const depotRepository = require('../repository/depot.repository');
const mouvementRepository = require('../repository/mouvement.repository');
const stockRepository = require('../repository/stock.repository');
const depotService = require('./depot.service');

class mouvementService{

     id_depLimite
     ancienlLimite_dep
     ancienNom_dep
     valeurLimitDept

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
        let findByIdDepot = await depotRepository.findById(id_dep);
        const ancienLimitDepot = findByIdDepot.limite_dep
        const ancienIdDepot = findByIdDepot.id_dep
    
        // const updat = ancienLimitDepot = nouvelValeurLimitDepot
        if (type_mvt == "Entrée") {
            const nouvelValeurLimitDepot = ancienLimitDepot + data.qtt_mvt
            //modification limite_dep 

            await this.updateDepot(ancienIdDepot,nouvelValeurLimitDepot);

            //maka an'ilay depot sy prod
            await this.findDepotProduitCreation(qtt_mvt, type_mvt, id_dep, id_p);
            if(data.qtt_mvt < 0)
                data.qtt_mvt = 0
            // creation mouvement


           return await this.create(data)
                
        } else /* type_mvt == "Sortie" */{

            const nouvelValeurLimitDepot = ancienLimitDepot - data.qtt_mvt
            
            // condition analyser que le qtt_mvt supérieur égale limite_dep
            if (data.qtt_mvt <= ancienLimitDepot) {

                //modification limite_dep 
    
                await this.updateDepot(ancienIdDepot,nouvelValeurLimitDepot);
            
                //maka an'ilay depot sy prod
                await this.findDepotProduitCreation(qtt_mvt, type_mvt, id_dep, id_p);
                
                // creation mouvement
               return await this.create(data)

        
            } else{
    
                // misafidy le depot izay betsaka @ io ancienLimitDepot io
                const dataLimitSupperieur =  await depotService.findSupperieurAncienLimite(ancienIdDepot, qtt_mvt)
    
                if (dataLimitSupperieur.length != 0) {
                    
                    console.log("Limite supperieur à ancien depot ", dataLimitSupperieur);
                
                    dataLimitSupperieur.forEach(depot => {
                        const idLimiteSup = depot.dataValues.id_dep;
                        const ancienLimite = depot.dataValues.limite_dep;
                        const ancienNom = depot.dataValues.nom_dep;
        
                        this.id_depLimite = idLimiteSup
                        this.ancienlLimite_dep = ancienLimite
                        this.ancienNom_dep = ancienNom
        
                        }
                    );
                    
                    console.log("id_depLimite",this.id_depLimite);
                    console.log("nouveaux depot",this.ancienNom_dep);
                    console.log("ancienLimite",this.ancienlLimite_dep); 
                    console.log("qtt_mvt",qtt_mvt);
        
                    const nouvellLimitDept = this.ancienlLimite_dep - qtt_mvt
    
                    if (nouvellLimitDept < 0 ) 
                        nouvellLimitDept = 0
                    else
                    {
                        this.valeurLimitDept = nouvellLimitDept
                        console.log('nouvellLimitDept',nouvellLimitDept);

                        await this.updateDepot_p(id_dep)

        
                        const newMouvement = {
                            id_p, type_mvt, date_mvt, id_ut,
                            qtt_mvt,
                            id_dep : this.id_depLimite                            
                        }

                        // regarder si le valeur de produit est la même dans la table stock
                        await  this.findStockByProdDep_Newmouvement(this.id_depLimite, nouvellLimitDept, type_mvt, id_p, qtt_mvt) 
                        
                       return await this.create(newMouvement)
                    } 
    
                } else {
                    console.log("nok");
                }
            }
        }
    }

    async updateDepot_p(id_dep) {
        // Récupérer l'instance de Depot avec l'id spécifié
        const ancienDepot = await Depot.findByPk(id_dep); 
    
        if (!ancienDepot) {
            throw new Error('Depot not found');
        }
    
        const nouvellDepot = {
            nom_dep: this.ancienNom_dep,
            limite_dep: this.valeurLimitDept
        };

        // console.log("valeur update depot", nouvellDepot);    
        console.log(`
        /
         ****
         * Le dépot ${nouvellDepot.nom_dep} est en libre de stocker cette mouvement 
         ****
         /
        `);

        // Passer l'identifiant du depot au lieu de l'instance
        return await depotRepository.update(this.ancienNom_dep, nouvellDepot);
    }

    async updateStock_dep_pro(stock, qtt_mvt, type_mvt){
        
        if (type_mvt ==  "Entrée") {
            stock.qtt_st+= qtt_mvt 
            
        }else {
            stock.qtt_st -= qtt_mvt 
        }

        if (stock.qtt_st < 0) {
            stock.qtt_st = 0
        }

        await stockRepository.update(stock.id_st, stock)
    }

    async createNewStock(id_p, id_dep, qtt_mvt, type_mvt){

        let qtt_st 

            if (type_mvt == "Entrée") {
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
    async updateDepot(ancienIdDepot,nouvelValeurLimitDepot){
        return await stockRepository.updateNouveau(ancienIdDepot,nouvelValeurLimitDepot)
    }

    async findDepotProduitCreation(qtt_mvt, type_mvt, id_dep, id_p){

        let stock = await this.findStockByProdDep(id_dep, id_p); 
        
        if(stock != null){ //rah misy 
            stock = JSON.stringify(stock)
            stock = JSON.parse(stock)
            return  await this.updateStock_dep_pro(stock, qtt_mvt, type_mvt) // ataov n modif
        }else 
        return  await this.createNewStock(id_p, id_dep, qtt_mvt, type_mvt) //raha tss de mcreer
    }

    async findStockByProdDep_Newmouvement(id_depLimite, nouvellLimitDept, type_mvt, id_p, qtt_mvt) {
     
    this.id_depLimite = id_depLimite
    // regarder si le valeur de produit est la même dans la table stock
    let stock = await this.findStockByProdDep(this.id_depLimite, id_p); 
    
    console.log("stock-- ", stock);

    if(stock != null){ //rah misy 
        stock = JSON.stringify(stock)
        stock = JSON.parse(stock)

        await this.updateStock_dep_pro(stock, nouvellLimitDept, type_mvt) // ataov n modif
    }else 
        await this.createNewStock(id_p, this.id_depLimite, qtt_mvt, type_mvt) //raha tss de mcreer
    }
}

module.exports = new mouvementService();