import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketType } from '../models/tickettype';

@Injectable({
  providedIn: 'root',
})
export class TickettypeService {
    http: HttpClient = inject(HttpClient);
    httpOptions;
    token;
    baseUrl: string = "http://localhost:5041/api/tickettype/";  
    
    constructor() {
      this.token = sessionStorage.getItem("token");
      console.log(this.token);
      this.httpOptions = { 
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.token
        })
      };
    }

    getAllTicketTypes(): Observable<TicketType[]>{
      return this.http.get<TicketType[]>(this.baseUrl, this.httpOptions);
    }

    addTicketType(tickettype : TicketType): Observable<TicketType>{
      console.log(tickettype);
      return this.http.post<TicketType>(this.baseUrl, tickettype, this.httpOptions);
    }

    getTicketType(tic: string): Observable<TicketType>{
      return this.http.get<TicketType>(this.baseUrl + tickettype, this.httpOptions);
    }

}
