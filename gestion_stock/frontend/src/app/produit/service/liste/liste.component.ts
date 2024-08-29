import { Component, Input, numberAttribute } from '@angular/core';
import { ProduitService } from '../produit.service';
import Swal from 'sweetalert2';
import { Produit } from '../../produit.model';
import { AjoutProduitComponent } from '../ajout/ajout.component';
import { environment } from '../../../../environments/environments';
import { MouvementService } from '../../../mouvement/service/mouvement.service';

@Component({
  selector: 'app-list-produit',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css'],
})
export class ListeProduitComponent extends AjoutProduitComponent{

  environment:string = environment.imageUrl
  
  searchResults: any[] = [];
  searchTerm: string = '';
  // totalPages = this.totalPage();
  idDelete?:number // id produit à supprimer

  histoProduit:any  = null;
  mouvements:any [] = [];
  stocks:any [] = [];

  countProduitParMouvement?: number;
  
  override ngOnInit(): void {
  console.log("ngOnInit---");
    this.countProd()
  }


  totalPage():number{

    const limitProduits:number = 5 ;
    const nbrProduits:any= this.sommes
    const totalPage = nbrProduits / limitProduits

    return Math.ceil(totalPage)

  }

  setIdDelete(id_p:number){
    this.idDelete = id_p
  }

  onSearch() {
    this.produitService.searchProduits(this.searchTerm).subscribe((results) => {
      this.searchResults = results;
    });
  }

  voirLeDetail(id: number){
    try {
      this.produitService.getByIdProduit(id)
      .subscribe(
        (data:any)=>{
          this.histoProduit = data
          this.mouvements = data.mouvement
          this.stocks = data.stock
          console.log("donné", data)
          console.log("mouvements", data.mouvement)
          console.log("stocks", data.stock)
        }
      );

      this.mouvementService.countMouvementParProduit(id)
      .subscribe((result :any)=>{
        this.countProduitParMouvement = result
        console.log("count produit par mouvement",result);

      })
       
    } catch (error) {
      console.log("error", error);
    }
  }
}
