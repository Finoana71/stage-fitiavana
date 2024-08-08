import { Component, OnInit } from '@angular/core'
import { DepotService } from './service/depot.service'
import { Depot } from './depot.model'

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrl: './depot.component.css'
})
export class DepotComponent implements OnInit{  
  titre = "Liste des dépots"
  // liste Depot
  depots: Depot[] = []
  depotSuppr = false

  constructor(private DepotService: DepotService){}

  ngOnInit(): void {
    this.DepotService.getDepot().subscribe(data =>{
      this.depots = data
    })
  }
  // fin liste Depot

  addDepot(depot: Depot){
    this.depots.push(depot)
  }

}

