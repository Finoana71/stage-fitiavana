import { Component, EventEmitter, Output } from '@angular/core';
import { MouvementService } from '../mouvement.service'
import { ProduitService } from '../../../produit/service/produit.service';
import { DepotService } from '../../../depot/service/depot.service';
import { UtilisateurService } from '../../../utilisateur/service/utilisateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajout-mouvement',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css'],
})
export class AjoutMouvementComponent {

  @Output()onAdd = new EventEmitter();

  type_mvt:string = '';
  date_mvt?:Date;
  qtt_mvt?:number;
  id_p?:number;
  id_dep?:number;
  id_ut?:number;

  produits:any[] = [];
  depots:any[] = [];
  utilisateurs:any[] = [];
  emailLocalStorage = localStorage.getItem("email");
  page = 1;

  constructor(
    private ajoutMouvementServ : MouvementService,
    private produitService: ProduitService ,
    private depotService : DepotService,
  ){}


  ngOnInit(): void {
    this.produitService.getProduit(this.page).subscribe(data => {
      this.produits = data;
    });

    this.depotService.getDepot().subscribe(data => {
      this.depots = data;
    })
  }

  ajoutMouvement(){
    const mouvement = {
      type_mvt: this.type_mvt,
      date_mvt: this.date_mvt,
      qtt_mvt: this.qtt_mvt,
      id_p: this.id_p,
      id_dep: this.id_dep,
      id_ut: this.id_ut
    }
    this.ajoutMouvementServ.ajoutMouvement(mouvement).subscribe(

      (response:any) =>{
        response.mouvement.utilisateur = response.utilisateur;
        response.mouvement.depot = response.depot;
        response.mouvement.produit = response.produit;

        this.valider();
        this.onAdd.emit(response.mouvement)

      },
      (erreur:any) =>{
        this.error();
      }

    )
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
      text: "Please check your add mouvement!",
    });
  }
}
