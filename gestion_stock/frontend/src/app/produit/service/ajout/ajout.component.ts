import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProduitService } from '../produit.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produit } from '../../produit.model';


@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css'],
})
export class AjoutProduitComponent implements OnInit{
  @Output()estAjout = new EventEmitter;

  @Input() produits: any[] = [];

  myForm:FormGroup
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
  emailLocalStorage = localStorage.getItem("email");
  page = 1

  constructor(
    public produitService: ProduitService,
    private fb: FormBuilder
  ){
    this.myForm = this.fb.group({
      designation_p:[this.designation_p, Validators.required],
      photo_p:[this.photo_p, Validators.required],
      categorie_p:[this.categorie_p, Validators.required],
      poid_p:[this.poid_p, Validators.required],
      prix_p:[this.prix_p, Validators.required],
    })
  };

  ngOnInit(): void {
    this.imageInfos = this.produitService.getfiles();
    this.produitService.countProduit()
    .subscribe(data=>{
      this.sommes = data.total_p;
      console.log("total", data);
    });
    // this.countProd()
    // this.handlePageChange(this.page)
  }

  countProd():number{
    this.produitService.countProduit()
    .subscribe(data=>{
      this.sommes = data.total_p;
    });
    return this.sommes;
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
          // console.log(e.target.result);
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

    this.produitService.ajoutProduit(produit).subscribe(
      (response:any) =>
        {

          this.valider();
          this.estAjout.emit(response);        
          const a = this.countProd()
          console.log("aaaa", a);
          
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
  
  supprimerProduit(id:number){

    this.produitService.supprProduit(id).subscribe(
      (response:Produit) => {

          const index = this.produits.findIndex(
            (prd:Produit) => prd.id_p == id)
          this.produits.splice(index,1)
          this.validerSuppr();      

        },
      erreur =>{
        console.log("errrooor", erreur);

        this.error();
      }
    );
  }

  listeProduit(){
    this.produitService.getProduit(this.page).subscribe(data =>{
      this.produits = data;
    })
  }

  handlePageChange(page:any){
    this.page = page;
    this.listeProduit()
  }

}