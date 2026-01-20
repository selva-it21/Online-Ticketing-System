import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketReply } from '../models/ticketreply';

@Injectable({
  providedIn: 'root'
})
export class TicketReplyService {

  http: HttpClient = inject(HttpClient);
  baseUrl = 'https://localhost:5041/api/TicketReply';

  getAllReplies(): Observable<TicketReply[]> {
    return this.http.get<TicketReply[]>(this.baseUrl);
  }

  getReplyById(replyId: string): Observable<TicketReply> {
    return this.http.get<TicketReply>(`${this.baseUrl}/${replyId}`);
  }

  getRepliesByTicketId(ticketId: string): Observable<TicketReply[]> {
    return this.http.get<TicketReply[]>(`${this.baseUrl}/ticket/${ticketId}`);
  }

  getRepliesByCreator(empId: string): Observable<TicketReply[]> {
    return this.http.get<TicketReply[]>(`${this.baseUrl}/creator/${empId}`);
  }

  getRepliesByAssigned(empId: string): Observable<TicketReply[]> {
    return this.http.get<TicketReply[]>(`${this.baseUrl}/assigned/${empId}`);
  }

  getRepliesByEmployee(empId: string): Observable<TicketReply[]> {
    return this.http.get<TicketReply[]>(`${this.baseUrl}/employee/${empId}`);
  }

  addReply(reply: TicketReply): Observable<any> {
    return this.http.post(this.baseUrl, reply);
  }

  updateReply(replyId: string, reply: TicketReply): Observable<any> {
    return this.http.put(`${this.baseUrl}/${replyId}`, reply);
  }

  deleteReply(replyId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${replyId}`);
  }
}
