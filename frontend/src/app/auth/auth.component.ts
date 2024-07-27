import { Component, EventEmitter, Output } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  email_ut!: string;
  mdp_ut?: string;
  emailStorage = localStorage.getItem("email");

  constructor(private authService: AuthService, private router: Router){}

  login():void{

    this.authService.login(this.email_ut, this.mdp_ut).subscribe(
      response =>{

        localStorage.setItem('token', response.token);
        localStorage.setItem('email', this.email_ut);

        localStorage.getItem('email');

        this.loginSucces();
        this.IfAdmin();

        this.router.navigate(['/gestion_de_stock_multi-tâche']);

      },
      error =>{
        this.error();
      }
    );
  }
  getut(){
    return this.authService.protected();
  }


  error(){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please check your authentication!",
      });
  }

  loginSucces(){
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 1000,
    });
    Toast.fire({
      icon: "success",
      title: "Signed in successfully"
    })
  }


  IfAdmin(){
    let email = this.emailStorage ;

    if (email = "admin@gmail.com") {
      console.log("dfqdfqdf");
    }
  }

}

