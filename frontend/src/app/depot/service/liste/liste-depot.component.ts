import { Component, Input } from '@angular/core'
import { DepotService } from '../depot.service'
import { Depot } from '../../depot.model'

@Component({
  selector: 'app-liste-depot',
  templateUrl: './liste-depot.component.html',
  styleUrl: './liste-depot.component.css'
})
export class ListeDepotComponent {
  depot:Depot ={id_dep:0, nom_dep:''};

  @Input() depots: Depot[] = [] // prende le donné apres l'ajout

  depotSuppr:boolean = false
  ErreurSuppr:boolean = false
  
  nomDep?:string;

  constructor(private DepotService: DepotService){}

  supprimerDep(id:number){
    this.DepotService.supprDepot(id).subscribe(

      (response:Depot) =>{
        this.depotSuppr = true
        
        const index = this.depots.findIndex(
          (dep:Depot) => dep.id_dep == id,
          console.log("id_dep", (dep:Depot)=>dep.id_dep == id)
        
        )
        this.depots.splice(index,1) // firy no ho fafana amin ilaina tableaux "index"
      },
      (erreur:Depot) =>{
        this.ErreurSuppr = true
        console.log("dddddddd", id);
        
      }
    )
  }

  modifDepot:any  = null;

  getDepot(id:number){
    this.DepotService.getIdDepot(id)
    .subscribe(data =>{
      this.modifDepot = data;
      console.log("donné", data);
    })
  };


  
  modification(id:number){
    this.DepotService.modification(id,this.depot)
  }

}
