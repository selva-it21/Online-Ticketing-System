import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketReply } from '../models/ticketreply';

@Injectable({
  providedIn: 'root'
})
export class TicketReplyService {
  http: HttpClient = inject(HttpClient);
  baseUrl = 'http://localhost:5041/api/TicketReply/';
  httpOptions;
  token;

  constructor() {
    this.token = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      })
    };
  }

  getAllReplies(): Observable<TicketReply[]> {
    return this.http.get<TicketReply[]>(this.baseUrl, this.httpOptions);
  }

  getReplyById(replyId: string): Observable<TicketReply> {
    return this.http.get<TicketReply>(this.baseUrl + replyId, this.httpOptions);
  }

  getRepliesByTicketId(ticketId: string): Observable<TicketReply[]> {
    console.log("hi");
    
    return this.http.get<TicketReply[]>(this.baseUrl + 'ticket/' + ticketId, this.httpOptions);
  }

  getRepliesByCreator(empId: string): Observable<TicketReply[]> {
    return this.http.get<TicketReply[]>(this.baseUrl + 'creator/' + empId, this.httpOptions);
  }

  getRepliesByAssigned(empId: string): Observable<TicketReply[]> {
    return this.http.get<TicketReply[]>(this.baseUrl + 'assigned/' + empId, this.httpOptions);
  }

  getRepliesByEmployee(empId: string): Observable<TicketReply[]> {
    return this.http.get<TicketReply[]>(this.baseUrl + 'employee/' + empId, this.httpOptions);
  }

  addReply(reply: TicketReply): Observable<TicketReply> {
    return this.http.post<TicketReply>(this.baseUrl, reply, this.httpOptions);
  }

  updateReply(replyId: string, reply: TicketReply): Observable<any> {
    return this.http.put(this.baseUrl + replyId, reply, this.httpOptions);
  }

  deleteReply(replyId: string): Observable<any> {
    return this.http.delete(this.baseUrl + replyId, this.httpOptions);
  }
}