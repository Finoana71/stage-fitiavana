import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mouvement } from '../mouvement.modele';

@Injectable({
  providedIn: 'root'
})
export class MouvementService {


  private apiUrl = "http://localhost:8080/api/mouvement";

  constructor(private http: HttpClient) { }

  getMouvement(): Observable<any[]> {
    return this.http.get<Mouvement[]>(this.apiUrl);
  }

  ajoutMouvement(mouvement: Mouvement): Observable<Mouvement>{
    return this.http.post<Mouvement>(this.apiUrl, mouvement);
  }
  supprMouvement(id: number): Observable<Mouvement>{
    return this.http.delete<Mouvement>(`${this.apiUrl}/${id}`)
  }
  getByIdMouv(id: number): Observable<Mouvement[]>{
    return this.http.get<Mouvement[]>(`${this.apiUrl}/${id}`)
  }
  
  modification(id:number, Mouvement:any):Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`,Mouvement);
  }
}
