import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { ProduitComponent } from './produit/produit.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { DepotComponent } from './depot/depot.component';
import { AjoutDepotComponent } from './depot/service/ajout/ajout.component';
import { ListeUtilisateurComponent } from './utilisateur/service/liste/liste-utilisateur.component';
import { AjoutUtilisateurComponent } from './utilisateur/service/ajout/ajout-utilisateur.component';
import { ListeDepotComponent } from './depot/service/liste/liste-depot.component';
import { FormsModule } from '@angular/forms';
import { StockComponent } from './stock/stock.component';
import { ListeStockComponent } from './stock/service/liste/list.component';
import { AjoutProduitComponent } from "./produit/service/ajout/ajout.component";
import { ListeProduitComponent } from "./produit/service/liste/ajout.component";
import { AjoutStockComponent } from './stock/service/ajout/ajout.component';
import { MouvementComponent } from './mouvement/mouvement.component';
import { ListeMouvementomponent } from './mouvement/service/liste/list.component';
import { AjoutMouvementComponent } from './mouvement/service/ajout/ajout.component';
import { slideComponent } from './slide/slide.component';
import { AuthComponent } from './auth/auth.component';
import { ProtectedComponent } from './protected/protected.component';
import { JwtInterceptor } from './interceptor/JwtInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BouttonUpdateComponent } from './boutton/miseajout/boutton.component';
import { BouttonDeleteComponent } from './boutton/supprimer/boutton.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterOutlet,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule

  ],
  declarations: [

    AppComponent,
    NavbarComponent,

    // Boutton
    BouttonUpdateComponent,
    BouttonDeleteComponent,


    // slide
    slideComponent,

    // les modules Produits
    ProduitComponent,
    ListeProduitComponent,
    AjoutProduitComponent,

    // les modules Utilisations
    UtilisateurComponent,
    ListeUtilisateurComponent,
    AjoutUtilisateurComponent,

    // les modules Depots
    DepotComponent,
    AjoutDepotComponent,
    ListeDepotComponent,
    // les modules Stocks
    StockComponent,
    ListeStockComponent,
    AjoutStockComponent,

    // les modules Stocks
    MouvementComponent,
    ListeMouvementomponent,
    AjoutMouvementComponent,

    //Authentification
    AuthComponent,
    ProtectedComponent

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
