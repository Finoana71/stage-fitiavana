import { Component, Input, OnInit } from '@angular/core';
import { MouvementService } from '../mouvement.service';
import { Mouvement } from '../../mouvement.modele';
import { ProduitService } from '../../../produit/service/produit.service';
import { DepotService } from '../../../depot/service/depot.service';
import { StockService } from '../../../stock/service/stock.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AjoutMouvementComponent } from '../ajout/ajout.component';


@Component({
  selector: 'app-list-mouvement',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListeMouvementomponent extends AjoutMouvementComponent implements OnInit  {

  // myForm:FormGroup;

  mouvement:Mouvement = {
    id_mvt:0 ,
    type_mvt:'',
    date_mvt: new Date,
    qtt_mvt:0,
    id_p:0,
    id_dep:0,
    id_ut:0
  }

  modifMouve:any = null;

  @Input()mouvements : any[] = [];
  histoMouve:any  = null;

  mouvementSuppr:boolean = false;
  ErreurSuppr:boolean = false
  // produits:any[] = [];
  // depots:any[] = [];
  // page = 1;

  // constructor(
  //     private mouvementService: MouvementService,
  //     private produitService: ProduitService ,
  //     private depotService : DepotService,
  //     private fb : FormBuilder
  //   ){
  //     this.myForm = this.fb.group({
  //       date:[this.mouvement.date_mvt, [Validators.required]],
  //       qtt:[this.mouvement.qtt_mvt, [Validators.required, Validators.min(1)]],
  //     })}

  // ngOnInit(): void {
  //   this.produitService.getProduit(this.page).subscribe(data => {
  //     this.produits = data;
  //   });

  //   this.depotService.getDepot().subscribe(data => {
  //     this.depots = data;
  //   })

  // }

  supprimerMouv(id:number){
    this.MouvementService.supprMouvement(id).subscribe(
      (response:any) =>{
        this.mouvementSuppr = true;

        const index = this.mouvements.findIndex((mvt:any)=>mvt.id_mvt == id)
        this.mouvements.splice(index,1) // firy no ho fafana amin ilaina tableaux "index"

      },
      (erreur:any) =>{
        this.ErreurSuppr = true;
      }
    );
  }

  voirLeDetail(id: number){
    this.MouvementService.getByIdMouv(id).subscribe(data =>{
      this.histoMouve = data;
      console.log("donné", data)
      }
    )
  }

  onModif(){

      let id = this.modifMouve;
      console.log("id",id);

      console.log("mouvement", this.mouvement);
      
      
      this.MouvementService.modification(id, this.mouvement).subscribe({
        next: (response) =>{
          console.log('update', response.mouvement);

          const index = this.mouvements.findIndex((mouv:Mouvement) =>mouv.id_mvt == id);
          this.mouvements[index] = response.mouvement;

          this.validerUpdate();
        },
        error:(err) =>{
          console.log("errr", err);
          
          this.errorUpdate();
        }
      })


  }

  // getMouve(id:number){
  //   this.MouvementService.getB(id).subscribe(data =>{
  //   this.modifMouve = data;

    
  //   console.log("id_dep",this.modifMouve.depot.id_dep);
  //   console.log("id_p",this.modifMouve.produit.id_p);
  //   console.log("id_mv",this.modifMouve.produit.id_mvt);

  //   })
  // };

  getMouve(id_mvt:number){
    this.modifMouve = id_mvt;

    console.log("id_mv",this.modifMouve);

  }

  validerUpdate(){
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
    });
    Toast.fire({
      icon: "success",
      title: "update succes"
    })
  }
  errorUpdate(){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please check your update mouvement!",
    });
  }
}