import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../models/ticket';
import { TicketService } from '../ticket-service';

@Component({
  selector: 'app-ticket-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './ticket-component.html',
  styleUrl: './ticket-component.css',
})
export class TicketComponent {

  ticketSvc: TicketService = inject(TicketService);
  tickets: Ticket[];
  errMsg: string;
  ticket: Ticket;

  constructor() {
    this.tickets = [];
    this.ticket  = new Ticket("","","","",new Date() ,"","" ,"")
    this.errMsg = '';
    this.showAllTickets();
  }

  // 🔹 Get all tickets
  showAllTickets(): void {
    this.ticketSvc.showAllTickets().subscribe({
      next: (response: Ticket[]) => {
        this.tickets = response;
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

  // 🔹 Add new ticket
  addTicket(): void {
    this.ticketSvc.addTicket(this.ticket).subscribe({
      next: (response: Ticket) => {
        this.tickets.push(response);
        this.ticket = {} as Ticket;
        alert('New Ticket created successfully!');
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

  // 🔹 Get ticket by ID
  showTicket(): void {
    this.ticketSvc.getOneTicket(this.ticket.TicketId).subscribe({
      next: (response: Ticket) => {
        this.ticket = response;
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

  // 🔹 Update ticket
  updateTicket(): void {
    this.ticketSvc.updateTicket(this.ticket.TicketId, this.ticket).subscribe({
      next: () => {
        this.showAllTickets();
        alert('Ticket updated successfully!');
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

  // 🔹 Delete ticket
  deleteTicket(): void {
    this.ticketSvc.deleteTicket(this.ticket.TicketId).subscribe({
      next: () => {
        this.showAllTickets();
        alert('Ticket deleted successfully!');
        this.ticket = {} as Ticket;
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

  // 🔹 Filter tickets by type
  getTicketsByType(): void {
    this.ticketSvc.getTicketsByType(this.ticket.TicketTypeId).subscribe({
      next: (response: Ticket[]) => {
        this.tickets = response;
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

  // 🔹 Filter tickets by creator
  getTicketsByCreator(): void {
    this.ticketSvc.getTicketsByCreator(this.ticket.CreatedByEmpId).subscribe({
      next: (response: Ticket[]) => {
        this.tickets = response;
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

  // 🔹 Filter tickets assigned to employee
  getTicketsAssignedTo(): void {
    this.ticketSvc.getTicketsAssignedTo(this.ticket.AssignedToEmpId).subscribe({
      next: (response: Ticket[]) => {
        this.tickets = response;
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }
}
