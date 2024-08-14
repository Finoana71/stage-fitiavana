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

  // totalPages = this.totalPage();
  idDelete?:number // id produit à supprimer 

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

}