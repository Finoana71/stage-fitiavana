import { Component, EventEmitter, Output } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  email_ut!: string;
  mdp_ut?: string;

  constructor(private authService: AuthService, private router: Router){}

  login():void{
     
    this.authService.login(this.email_ut, this.mdp_ut).subscribe(
      response =>{    
            
        localStorage.setItem('token', response.token);
        localStorage.setItem('email', this.email_ut);


        let a = localStorage.getItem('email');

        
        this.router.navigate(['/gestion_de_stock_multi-tâche']);
        
        console.log("aaaa", a);
        console.log("dfdsf", this.getut());
        
        
      },
      error =>{
        console.log('login error', error);
      }
    );
  }
  getut(){
    return this.authService.protected();
  }
}

