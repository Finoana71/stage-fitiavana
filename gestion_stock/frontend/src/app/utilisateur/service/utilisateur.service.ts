import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../uilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private apiUrl = "http://localhost:8081/api/utilisateur";

  constructor(private http: HttpClient) { }

  getUtilisateur(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.apiUrl);
  }
  ajoutUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur>{
    return this.http.post(this.apiUrl, utilisateur);
  }
  supprUtilisateur(id: number): Observable<Utilisateur>{
    return this.http.delete<Utilisateur>(`${this.apiUrl}/${id}`)
  }
}
