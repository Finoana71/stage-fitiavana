import { Component, Input } from '@angular/core';
import { StockService } from '../stock.service';


@Component({
  selector: 'app-list-stock',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListeStockComponent {
  @Input()stocks: any[] =[]
  
  histoStocks:any  = null

  stockSuppr:boolean = false
  ErreurSuppr:boolean = false

  modifSuccess:boolean = false

  constructor(private stockService: StockService){}

  voirLeDetail(id: number){
    this.stockService.getByIdStock(id)
    .subscribe(data =>{
      this.histoStocks = data;
      console.log("donné", data)
      }
    )
  }

  supprimer(id:number){
    this.stockService.supprStock(id).subscribe(
      (response:any) =>{
        this.stockSuppr = true;
        
        const index = this.stocks.findIndex((stok:any)=>stok.id_st == id)
        this.stocks.splice(index,1) // firy no ho fafana amin ilaina tableaux "index"

      },
      (erreur:any) =>{
        this.ErreurSuppr = true;
      }
    );
  }

}
