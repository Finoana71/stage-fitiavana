import { Component, EventEmitter, Output, output } from '@angular/core';
import { StockService } from '../stock.service';
import { ProduitService } from '../../../produit/service/produit.service';
import { DepotService } from '../../../depot/service/depot.service';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-ajout-stock',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css'],
})
export class AjoutStockComponent {
 
  @Output()estAjoutStock = new EventEmitter();
   
  qtt_st? : number;
  id_p? : number;
  id_dep? : number;

  produits: any[] = [];
  depots: any[] = [];

  stockAjout: boolean = false;
  erreurAjout: boolean = false;

  constructor(
    private produitsService: ProduitService,
    private depotService: DepotService,
    private stockService: StockService ) { 
  }

  ngOnInit(): void {

    this.produitsService.getProduit().subscribe(data => {
      this.produits = data;
    });

    this.depotService.getDepot().subscribe(data => {
      this.depots = data;
    });

  }

  ajoutStock() {
    const stock = {
      qtt_st: this.qtt_st,
      id_p: this.id_p,
      id_dep: this.id_dep
    };

    console.log("les stocks", stock);

    this.stockService.ajoutStock(stock).subscribe(

      (response: any) => {
        this.stockAjout = true;

        response.stock.produit = response.produit;
        response.stock.depot = response.depot;
        this.estAjoutStock.emit(response.stock);
        
      },
      (erreur: any) => { this.erreurAjout = true; }
    );
  }
}
