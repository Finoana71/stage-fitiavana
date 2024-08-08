import { Component, EventEmitter, Output } from '@angular/core';
import { ProduitService } from '../produit.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Console, error, log } from 'console';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css'],
})
export class AjoutProduitComponent {

  @Output()estAjout = new EventEmitter;

  sommes: number = 0;

  photo_p!: string |undefined;
  designation_p: string = "";
  categorie_p: string = "";
  poid_p: number | undefined;
  prix_p: number | undefined;

  currentFile?:File;
  message = '';
  preview = '';
  imageInfos?: Observable<any>;
  emailLocalStorage = localStorage.getItem("email")


  constructor(public produitService: ProduitService){};

  ngOnInit(): void {
    this.imageInfos = this.produitService.getfiles();
    this.produitService.countProduit()
    .subscribe(data=>{
      this.sommes = data.total_p;
      console.log("total", data);
    });
  }

  countProd(){
    this.produitService.countProduit()
    .subscribe(data=>{
      this.sommes = data.total_p;
    });
  }

  selectFile(event: any): void {
    this.message='';
    this.preview='';
   
    const selectedFiles = event.target.files;
    
    if(selectedFiles){
      const file: File | null = selectedFiles.item(0);

      this.photo_p = file?.name

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e:any) =>{
          console.log(e.target.result);
          this.preview = e.target.result;
        };
        reader.readAsDataURL(this.currentFile);
      }

    }

  }

  ajoutProduit(){
    const produit = {
      designation_p:this.designation_p,
      categorie_p:this.categorie_p,
      poid_p:this.poid_p,
      prix_p:this.prix_p,
      file:this.preview,
      photo_p : this.photo_p
    };

    console.log("nom du fichier", this.photo_p)
     
    console.log("photooooo", this.preview);
    
    this.produitService.ajoutProduit(produit).subscribe(
      (response:any) =>
        {
          this.valider();
          this.estAjout.emit(response);
        },
      (erreur:any) => {
        console.log("erreur", erreur)
        
        this.error()
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
      title: "Suppression avec succes"
    })
  }

  error(){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Vérifiez bien!",
    });
  }

  
}
