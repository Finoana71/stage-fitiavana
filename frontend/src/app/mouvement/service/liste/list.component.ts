import { Component, Input } from '@angular/core';
import { MouvementService } from '../mouvement.service';
import { Mouvement } from '../../mouvement.modele';
import { ProduitService } from '../../../produit/service/produit.service';
import { DepotService } from '../../../depot/service/depot.service';
import { StockService } from '../../../stock/service/stock.service';


@Component({
  selector: 'app-list-mouvement',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListeMouvementomponent {

  mouvement:Mouvement = { 
    id_mvt:0 ,
    type_mvt:'',
    date_mvt: new Date,
    qtt_mvt:0,
    id_p:0,
    id_dep:0,
    id_ut:0
  }

modifMouve:any  = null;

  @Input()mouvements : any[] = [];
  histoMouve:any  = null; 

  mouvementSuppr:boolean = false;
  ErreurSuppr:boolean = false 
  produits:any[] = [];
  depots:any[] = [];

  constructor(
      private mouvementService: MouvementService,
      private produitService: ProduitService ,
      private depotService : DepotService,
      private stockService : StockService
    ){}

  ngOnInit(): void {
    this.produitService.getProduit().subscribe(data => {
      this.produits = data;
    });

    this.depotService.getDepot().subscribe(data => {
      this.depots = data;
    })
  }


  supprimerMouv(id:number){
    this.mouvementService.supprMouvement(id).subscribe(
      (response:any) =>{
        this.mouvementSuppr = true;
        
        const index = this.mouvements.findIndex((mvt:any)=>mvt.id_mvt == id)
        this.mouvements.splice(index,1) // firy no ho fafana amin ilaina tableaux "index"

      },
      (erreur:any) =>{
        this.ErreurSuppr = true;
      }
    );
  }

  voirLeDetail(id: number){
    this.mouvementService.getByIdMouv(id).subscribe(data =>{
      this.histoMouve = data;
      console.log("donné", data)
      }
    )
  }

  onModif(){
    let id = this.modifMouve.id_mvt;

    this.mouvementService.modification(id, this.mouvement).subscribe({
      next: (response) =>{
        console.log('update', response);

        const index = this.mouvements.findIndex((mouv:Mouvement) =>mouv.id_mvt == id);               
        this.mouvements[index] = response.mouvement;

        console.log('update depot', response.mouvement);

        //modificaiton Stock
        // this.stockService.modification()
        
      }, 
      error:(err) =>{
        console.error('Error', err)
      }
    })
  }

  getMouve(id:number){
    this.mouvementService.getByIdMouv(id)

    .subscribe(data =>{
    this.modifMouve = data;

    console.log(this.modifMouve.depot.nom_dep);

    })
  };
}
