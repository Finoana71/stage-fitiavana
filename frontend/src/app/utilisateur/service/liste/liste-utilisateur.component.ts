import { Component, Input, OnInit } from '@angular/core';
import { UtilisateurService } from '../utilisateur.service';

@Component({
  selector: 'app-liste-utilisateur',
  templateUrl: './liste-utilisateur.component.html',
  styleUrl: './liste-utilisateur.component.css'
})
export class ListeUtilisateurComponent{
  
  @Input()utilisateurs: any[] =[]

  utiliSuppr:boolean = false;
  ErreurSuppr:boolean = false
  
  constructor(private utilisateurService: UtilisateurService){}

  supprimerUtili(id:number){
    this.utilisateurService.supprUtilisateur(id).subscribe(
      (response:any) =>{
        this.utiliSuppr = true;
        
        const index = this.utilisateurs.findIndex((mvt:any)=>mvt.id_mvt == id)
        this.utilisateurs.splice(index,1) // firy no ho fafana amin ilaina tableaux "index"

      },
      (erreur:any) =>{
        this.ErreurSuppr = true;
      }
    );
  }
}
