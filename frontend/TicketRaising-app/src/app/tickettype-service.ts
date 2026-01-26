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
    baseUrl: string = "http://localhost:5041/api/TicketType/";  
    
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

    getTicketType(tickettypeid: string): Observable<TicketType>{
      // console.log("he;");
      
      return this.http.get<TicketType>(this.baseUrl + tickettypeid, this.httpOptions);
    }

    updateTicketType(tickettypeid: string, tickettype: TicketType): Observable<TicketType>{
      return this.http.put<TicketType>(this.baseUrl + tickettypeid, tickettype, this.httpOptions)
    }

    deleteTicketType(tickettypeid: string):Observable<any> {
      return this.http.delete(this.baseUrl + tickettypeid, this.httpOptions);
    }

    getDepartmentbyId(depId : string) : Observable<any>{
      return this.http.get<any>(this.baseUrl + depId,this.httpOptions);
    }

}
