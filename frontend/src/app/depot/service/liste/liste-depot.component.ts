import { Component, Input, OnInit } from '@angular/core'
import { DepotService } from '../depot.service'
import { Depot } from '../../depot.model'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-depot',
  templateUrl: './liste-depot.component.html',
  styleUrl: './liste-depot.component.css'

})
export class ListeDepotComponent {

  depot:Depot ={ id_dep:0 ,nom_dep:''};

  modifDepot:any  = null;

  @Input() depots: Depot[] = [] // prende le donné apres l'ajout

  nomDep?:string;

  constructor(private DepotService: DepotService){}

  supprimerDep(id:number){
    this.DepotService.supprDepot(id).subscribe(

      (response:Depot) =>{

        const index = this.depots.findIndex(
          (dep:Depot) => dep.id_dep == id,
          console.log("id_dep", (dep:Depot)=>dep.id_dep == id)
        )
        this.depots.splice(index,1) // firy no ho fafana amin ilaina tableaux "index"

      },

    )
  }

  alert(id:number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
        popup: 'swal-custom-padding' // Ajoutez cette ligne pour appliquer la classe CSS personnalisée

      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.supprimerDep(id);

        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }

  modification(){

    let id = this.modifDepot.id_dep;

    this.DepotService.modification(id, this.depot).subscribe({
      next: (response) =>{
        console.log('update', response);

        const index = this.depots.findIndex((dep:Depot) =>dep.id_dep == id);        
             
        const nom_dep =  this.depots[index] = response.depot;
        
        console.log("aaaa", nom_dep);
        
        this.valider();
      }, 
      error:(err) =>{
        this.error();
      }
    })
  
  }


  getDepot(id:number){
    this.DepotService.getIdDepot(id)

    .subscribe(data =>{
    this.modifDepot = data;

    console.log(this.modifDepot);
    
    })
  };

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
