import { Component, EventEmitter, Output } from '@angular/core';
import { MouvementService } from '../mouvement.service'
import { ProduitService } from '../../../produit/service/produit.service';
import { DepotService } from '../../../depot/service/depot.service';
import { UtilisateurService } from '../../../utilisateur/service/utilisateur.service';

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

  mouvementAjout:boolean = false;
  erreurAjout:boolean = false;

  produits:any[] = [];
  depots:any[] = [];
  utilisateurs:any[] = [];

  constructor(
    private ajoutMouvementServ : MouvementService,
    private produitService: ProduitService ,
    private depotService : DepotService,
  ){}


  ngOnInit(): void {
    this.produitService.getProduit().subscribe(data => {
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
        console.log("dddd", response);

        this.mouvementAjout = true;
        
        response.mouvement.utilisateur = response.utilisateur;
        response.mouvement.depot = response.depot;
        response.mouvement.produit = response.produit;
        
        this.onAdd.emit(response.mouvement)
        
      },
      (erreur:any) =>{
        this.erreurAjout = true;
      }
      
    )
  }
}
