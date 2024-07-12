import { Component } from '@angular/core';
import { ProduitService } from "./service/produit.service";
import { Produit } from './produit.model';


@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css',
})
export class ProduitComponent {

  titre="Produits"
  // ngOnInit(): void {
  //   AOS.init({disable:'mobile'});
  //   AOS.refresh();
  // }
  
  produits: Produit[] = [];

  constructor(private produitService: ProduitService){}

  ngOnInit(): void {
    this.produitService.getProduit().subscribe(data =>{
      this.produits = data;
    })
  } 

  ajoutProduit(produit : Produit){
    this.produits.push(produit);
  }
}
