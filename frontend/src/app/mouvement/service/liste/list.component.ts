import { Component, Input } from '@angular/core';
import { MouvementService } from '../mouvement.service';


@Component({
  selector: 'app-list-mouvement',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListeMouvementomponent {
  @Input()mouvements : any[] = [];
  histoMouve:any  = null


  mouvementSuppr:boolean = false;
  ErreurSuppr:boolean = false
  
  constructor(private mouvementService: MouvementService){}

 
  supprimerMouv(id:number){
    this.mouvementService.supprMouvement(id).subscribe(
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
    this.mouvementService.getByIdMouv(id).subscribe(data =>{
      this.histoMouve = data;
      console.log("donné", data)
      }
    )
  }

}
