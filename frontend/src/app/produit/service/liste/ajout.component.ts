import { Component, Input } from '@angular/core';
import { ProduitService } from '../produit.service';


@Component({
  selector: 'app-list-produit',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css'],
})
export class ListeProduitComponent {

  @Input() produits: any[] = [];

  produitSuppr:boolean = false;
  ErreurSuppr:boolean = false

  constructor(private produitService: ProduitService){}
 
  supprimerProduit(id:number){

    this.produitService.supprProduit(id).subscribe(
      (response:any) => {
        this.produitSuppr = true;
        
        const index = this.produits.findIndex(
          (mvt:any) => mvt.id_mvt == id)
          this.produits.splice(index,1) // firy no ho fafana amin ilaina tableaux "index"

      },
      (erreur:any) =>{
        console.log("rrrrrrr--", erreur);
        
        this.ErreurSuppr = true;
      }
    );
    
  }

}
