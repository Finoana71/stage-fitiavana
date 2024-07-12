import { Component, EventEmitter, Output } from '@angular/core';
import { ProduitService } from '../produit.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Console, error } from 'console';


@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css'],
})
export class AjoutProduitComponent {

  @Output()estAjout = new EventEmitter;

  sommes: any = "";

  designation_p: string = "";
  categorie_p: string = "";
  photo_p: string = "";
  poid_p: number | undefined;
  prix_p: number | undefined;

  ProduitAjout: boolean = false;
  erreurAjout: boolean = false;
  
  currentFile?:File;
  message = '';
  preview = '';
  imageInfos?: Observable<any>;

  constructor(private produitService: ProduitService){};
  
  ngOnInit(): void {
    this.imageInfos = this.produitService.getfiles();
    this.produitService.countProduit()
    .subscribe(data=>{
      this.sommes = data;
      console.log("total", data);   
    });      
  }

  countProd(){
    this.produitService.countProduit()
    .subscribe(data=>{
      this.sommes = data;
      console.log("total", data);   
    });
  }

  selectFile(event: any):void{
    this.message='';
    this.preview='';
    const selectedFiles = event.target.files;

    if(selectedFiles){
      const file: File | null = selectedFiles.item(0);

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
      photo_p:this.photo_p,
      poid_p:this.poid_p,
      prix_p:this.prix_p
    };
 
    this.produitService.ajoutProduit(produit).subscribe(
      (response:any) =>
        {
          this.ProduitAjout = true;
          this.estAjout.emit(response); 
          this.countProd();
        },
      (erreur:any) =>
        {this.erreurAjout = true;}
    );
  }

}