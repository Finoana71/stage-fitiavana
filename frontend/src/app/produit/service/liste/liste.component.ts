import { Component, Input, numberAttribute } from '@angular/core';
import { ProduitService } from '../produit.service';
import Swal from 'sweetalert2';
import { Produit } from '../../produit.model';
import { AjoutProduitComponent } from '../ajout/ajout.component';


@Component({
  selector: 'app-list-produit',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css'],
})
export class ListeProduitComponent extends AjoutProduitComponent{

  @Input() produits: any[] = [];
  page = 1;
  totalPages = this.totalPage();

  supprimerProduit(id:number){

    this.produitService.supprProduit(id).subscribe(
      (response:any) => {

        const index = this.produits.findIndex(
          (prd:any) => prd.id_p == id)
          this.produits.splice(index,1) // firy no ho fafana amin ilaina tableaux "index"
          this.validerSuppr();
          this.ngOnInit();
        
        },
      erreur =>{
        console.log("errrooor", erreur);
        
        this.error();
      }
    );

  }

  totalPage():number{

    const limitProduits:number = 5 ;
    const nbrProduits:any= this.sommes

    console.log("nombre Produits");
    
    const totalPage = nbrProduits / limitProduits
 
    console.log("totalPage", totalPage);

    return Math.ceil(totalPage)
 
  }

  listeProduit(){
    this.produitService.getProduit(this.page).subscribe(data =>{
      this.produits = data;
    })
  }

  handlePageChange(page:any){
    this.page = page;
    this.listeProduit()
  }

}
