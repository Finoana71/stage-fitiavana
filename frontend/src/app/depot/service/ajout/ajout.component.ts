import { Component, Output, EventEmitter } from '@angular/core'
import { DepotService } from '../depot.service'
import { Depot } from '../../depot.model'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css'],
})

export class AjoutDepotComponent {

  @Output()onAdd = new EventEmitter(); // envoyez le donnée qu'on ajout

  id!:number
  nom_dep: string = ''
  depots: Depot[] = [] // Déclarer la propriété depots
  emailLocalStorage = localStorage.getItem("email")

  constructor(private ajoutService: DepotService,) { }

  ajouterDepot() {
    const depot = new Depot(this.id, this.nom_dep)

    this.ajoutService.ajoutDepot(depot).subscribe(
      (response:any) => {
        // Message avec succéss

        this.valider();
        // Récupérer le dépôt ajouté et l'ajouter à la liste des dépôts
        this.onAdd.emit(response)
      },
      erro =>{
        this.error();
      }

    );
  }

  valider(){
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
    });
    Toast.fire({
      icon: "success",
      title: "Ajout avec succes"
    })
  }

  error(){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please DOUBLON!",
    });
  }
}
