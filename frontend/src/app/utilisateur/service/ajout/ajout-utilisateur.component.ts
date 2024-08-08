import { Component, EventEmitter, Output } from '@angular/core';
import { UtilisateurService } from '../utilisateur.service';
import { AuthService } from '../../../auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajout-utilisateur',
  templateUrl: './ajout-utilisateur.component.html',
  styleUrl: './ajout-utilisateur.component.css'
})
export class AjoutUtilisateurComponent {

  @Output()ajoutUti = new EventEmitter();

  role : string = "";
  email_ut : string = "";
  mdp_ut  : string = "";
  mdp : string = "";

  utilisateurAjout: boolean = false;
  erreurAjout: boolean = false;

  constructor(
    private ajoutService : UtilisateurService,
    private auhtService : AuthService

  ){};

  // ajouterUtilisateur(){
  //   const utilisateur = {
  //     email_ut : this.email_ut,
  //     mdp_ut : this.mdp_ut
  //   };

  //   console.log("les utilisateur",utilisateur);

  //   this.ajoutService.ajoutUtilisateur(utilisateur).subscribe(
  //     (response:any) => {
  //       // Message avec succéss
  //       this.utilisateurAjout = true;

  //       // Récupérer le dépôt ajouté et l'ajouter à la liste des dépôts
  //       this.ajoutUti.emit(response);
  //     },

  //     (erreur:any) => {
  //       // Message d'erreur
  //       this.erreurAjout = true;
  //     }
  //   )
  // }


  register():void{


    this.auhtService.register(this.role,this.email_ut ,this.mdp_ut).subscribe(
      response =>{

        this.valider();
        this.ajoutUti.emit(response);

      },

      erreur => {
        // Message d'erreur
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

