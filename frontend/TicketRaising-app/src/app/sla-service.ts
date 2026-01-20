import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SLA } from '../models/sla';

@Injectable({
  providedIn: 'root',
})
export class SlaService {

  http: HttpClient = inject(HttpClient);
  token;
  baseUrl: string = 'http://localhost:5041/api/sla/';
  httpOptions;

  constructor() {
    this.token = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      })
    };
  }

  getAllSlas(): Observable<SLA[]> {
    return this.http.get<SLA[]>(this.baseUrl, this.httpOptions);
  }

  getSla(slaId: string): Observable<SLA> {
    return this.http.get<SLA>(this.baseUrl + slaId, this.httpOptions);
  }

  addSla(sla: SLA): Observable<SLA> {
    return this.http.post<SLA>(this.baseUrl, sla, this.httpOptions);
  }

  updateSla(slaId: string, sla: SLA): Observable<SLA> {
    return this.http.put<SLA>(this.baseUrl + slaId, sla, this.httpOptions);
  }

  deleteSla(slaId: string): Observable<any> {
    return this.http.delete(this.baseUrl + slaId, this.httpOptions);
  }
}
