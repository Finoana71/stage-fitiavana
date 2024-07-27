import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from '../stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private apiUrl = "http://localhost:8080/api/stock";

  constructor(private http: HttpClient) { }

  getStock(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.apiUrl);
  }
  ajoutStock(stock: Stock): Observable<Stock>{
    return this.http.post<Stock>(this.apiUrl, stock);
  }
  supprStock(id: number): Observable<Stock>{
    return this.http.delete<Stock>(`${this.apiUrl}/${id}`)
  }
  getByIdStock(id: number): Observable<Stock[]>{
    return this.http.get<Stock[]>(`${this.apiUrl}/${id}`)
  }
  modification(id: number, stock:any) :Observable<Stock>{
    return this.http.put(`${this.apiUrl}/${id}`, stock)
  }
  
}
