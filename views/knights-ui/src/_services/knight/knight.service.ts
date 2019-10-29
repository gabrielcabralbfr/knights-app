import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KnightService {

  constructor(private http: HttpClient) { }

  getAllKnights(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/knights`)
  }

  getKnightById(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/knights/${id}`)
  }

  deleteKnight(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/knights/${id}`)
  }

  createKnight(knight: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/knights/`, knight)
  }

  updateKnight(knight: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/knights/${knight.id}`, knight)
  }
}
