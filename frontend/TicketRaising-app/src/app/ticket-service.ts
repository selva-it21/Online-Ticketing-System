import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketService {

  http: HttpClient = inject(HttpClient);
  token;
  baseUrl: string = 'https://ticketportalteam3-hwg6cpg9gvbhaje6.canadacentral-01.azurewebsites.net/api/Ticket/';
  httpOptions;

  constructor() {
    this.token = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
      }),
    };
  }

  // 🔹 Get all tickets
  showAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.baseUrl, this.httpOptions);
  }

  // 🔹 Get ticket by ID
  getOneTicket(ticketId: string): Observable<Ticket> {
    return this.http.get<Ticket>(
      this.baseUrl + ticketId,
      this.httpOptions
    );
  }

  // 🔹 Get tickets by type
  getTicketsByType(ticketTypeId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(
      this.baseUrl + 'type/' + ticketTypeId,
      this.httpOptions
    );
  }

  // 🔹 Get tickets created by employee
  getTicketsByCreator(empId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(
      this.baseUrl + 'creator/' + empId,
      this.httpOptions
    );
  }

  // 🔹 Get tickets assigned to employee
  getTicketsAssignedTo(empId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(
      this.baseUrl + 'assigned/' + empId,
      this.httpOptions
    );
  }

  // 🔹 Create new ticket
  addTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(
      this.baseUrl,
      ticket,
      this.httpOptions
    );
  }

  // 🔹 Update ticket
  updateTicket(ticketId: string, ticket: Ticket): Observable<any> {
    return this.http.put(
      this.baseUrl + ticketId,
      ticket,
      this.httpOptions
    );
  }

  // 🔹 Delete ticket
  deleteTicket(ticketId: string): Observable<any> {
    return this.http.delete(
      this.baseUrl + ticketId,
      this.httpOptions
    );
  }
}
