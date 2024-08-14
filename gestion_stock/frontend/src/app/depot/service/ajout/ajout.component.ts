import { Component, Output, EventEmitter, Input } from '@angular/core'
import { DepotService } from '../depot.service'
import { Depot } from '../../depot.model'
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css'],
})

export class AjoutDepotComponent {
  sommes: number = 0;
  page = 1

  myForm: FormGroup;
  @Output()onAdd = new EventEmitter(); // envoyez le donnée qu'on ajout
  @Input() depots: Depot[] = [] // prende le donné apres l'ajout

  depot:Depot ={
    id_dep:0 ,
    nom_dep:''    
  };

  // id!:number
  nom_dep: string = 'Dépot'
  idDepot: any = null;

  // depots: Depot[] = [] // Déclarer la propriété depots
  emailLocalStorage = localStorage.getItem("email")

  constructor(
    public DepotService: DepotService,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      nom_dep:[this.nom_dep, Validators.required]
    })
  }

  ngOnInit(): void {
    this.handlePageChange(this.page);
  }

  // getNomDepot(){
  //   const id_dep = this.idDepot;
  //   const idDepotNom_dep = this.DepotService.getIdDepot(id_dep)
  //   console.log( idDepotNom_dep);
    
  // }

  listeDepots(){
    this.DepotService.getDepot(this.page).subscribe(data =>{
      this.depots = data;
    })
  }
  handlePageChange(page:any){
    this.page = page;
    this.listeDepots()
  }

  ajouterDepot() {
    const depot = new Depot(this.idDepot, this.nom_dep)

    this.DepotService.ajoutDepot(depot).subscribe(
      (response:any) => {
        // Message avec succéss

        this.valider();

        // Récupérer le dépôt ajouté et l'ajouter à la liste des dépôts
       console.log("response", response);
       
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
validerSuppr(){
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
  });
  Toast.fire({
    icon: "success",
    title: "Delete succefull"
  })
}


  error(){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please DOUBLON!",
    });
  }

  getDepot(id:number){
    this.DepotService.getIdDepot(id)

    .subscribe(data =>{
    this.idDepot = data;

    this.idDepot = id
    console.log(this.idDepot);
    })

  };



 supprimerDep(id:number){
   const id_dep = this.idDepot
   
   this.DepotService.supprDepot(id_dep).subscribe(

     (response:Depot) =>{

       const index = this.depots.findIndex(
         (dep:Depot) => dep.id_dep == id,
         console.log("id_dep", (dep:Depot)=>dep.id_dep == id)
       
        )
        this.depots.splice(index,1) // firy no ho fafana amin ilaina tableaux "index"
        this.validerSuppr()
        this.handlePageChange(this.page)
     },

   )
 }


 modification(){

   let id = this.idDepot;

   console.log("id_mo", id);
   
   this.DepotService.modification(id, this.depot).subscribe({
     next: (response) =>{
       console.log('update', response);

       const index = this.depots.findIndex((dep:Depot) =>dep.id_dep == id);

       const nom_dep =  this.depots[index] = response.depot;

       console.log("aaaa", nom_dep);

       this.valider();
     },
     error:(err) =>{
       console.log("err", err);
       
       this.error();
     }
   })

 }


}