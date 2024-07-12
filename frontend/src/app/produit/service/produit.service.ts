import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {


  private apiUrl = "http://localhost:8080/api/produit";

  constructor(private http: HttpClient) { }

  getProduit(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }
  ajoutProduit(produit: Produit):Observable<Produit>{
    return this.http.post<Produit>(this.apiUrl, produit);
  }

  getfiles():Observable<Produit>{
    return this.http.get<Produit>(`${this.apiUrl}`);
  }

  countProduit(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/count`)
  }
  supprProduit(id: number): Observable<Produit>{
    return this.http.delete<Produit>(`${this.apiUrl}/${id}`)
  }

}


