import { Component } from '@angular/core';
import { ListeMouvementomponent } from './service/liste/list.component';
import { MouvementService } from './service/mouvement.service';

@Component({
  selector: 'app-mouvement',
  templateUrl: './mouvement.component.html',
  styleUrl: './mouvement.component.css'
})
export class MouvementComponent {

  titre= "Mouvements"
  // liste Mouvement

  mouvements: any[] = [];

  constructor(private MouvementService: MouvementService){}

  ngOnInit(): void {
    this.MouvementService.getMouvement().subscribe(data =>{
      this.mouvements = data;
      console.log("dfqsfqdf", data);
    })
  }  // fin liste Mouvement

  addMouvement(mouvement:any){
    this.mouvements.push(mouvement);
  }
}
