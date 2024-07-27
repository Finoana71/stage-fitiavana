import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Depot } from '../depot.model'

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  private apiUrl = "http://localhost:8080/api/depot"

  constructor(private http: HttpClient) {}

  getDepot(): Observable<Depot[]> {
    return this.http.get<Depot[]>(this.apiUrl)
  }

  ajoutDepot(depot: Depot): Observable<Depot>{
    return this.http.post<Depot>(this.apiUrl, depot)
  }

  supprDepot(id: number): Observable<Depot>{
    return this.http.delete<Depot>(`${this.apiUrl}/${id}`)
  }
  
  getIdDepot(id:number):Observable<Depot>{
    return this.http.get<Depot>(`${this.apiUrl}/${id}`)
  }
  
  modification(id:number, depot:any):Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`,depot);
  }
}

