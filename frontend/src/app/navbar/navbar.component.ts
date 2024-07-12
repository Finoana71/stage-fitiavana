import { Component, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Auth } from '../auth/auth.model';
import { response } from 'express';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

btnvert: boolean = true;
seDecon: boolean = true;

@Input() email_ut?: Auth;

  constructor(private authService:AuthService){}

  getEmail(){

    let email = localStorage.getItem("email"); 
    if (email) {
      this.btnvert;
    }else{
      this.btnvert=false;
    }
    return email;
    
  }
  se_deconnecter():void{
    this.authService.logout();
  } 


}
 