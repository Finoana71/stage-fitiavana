import { Component, Output, EventEmitter } from '@angular/core'
import { DepotService } from '../depot.service'
import { Depot } from '../../depot.model'

@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css'],
})

export class AjoutDepotComponent {

  @Output()onAdd = new EventEmitter(); // envoyez le donnée qu'on ajout

  id!:number
  nom_dep: string = ''

  depotAjout: boolean = false
  erreurAjout: boolean = false
  depots: Depot[] = [] // Déclarer la propriété depots

  constructor(private ajoutService: DepotService,) { }

  ajouterDepot() {
    const depot = new Depot(this.id, this.nom_dep)

    this.ajoutService.ajoutDepot(depot).subscribe(
      (response:any) => {
        // Message avec succéss
        this.depotAjout = true
        
        // Récupérer le dépôt ajouté et l'ajouter à la liste des dépôts
        this.onAdd.emit(response)
      },
      
      (erreur:any) => {
        // Message d'erreur
        this.erreurAjout = true
      }
    );
  }
}
