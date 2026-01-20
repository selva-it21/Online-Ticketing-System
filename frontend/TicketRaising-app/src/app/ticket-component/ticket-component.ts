import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../models/ticket';
import { TicketService } from '../ticket-service';
import { TickettypeService } from '../tickettype-service';
import { TicketType } from '../../models/tickettype';

@Component({
  selector: 'app-ticket-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './ticket-component.html',
  styleUrl: './ticket-component.css',
})
export class TicketComponent {

  ticketSvc: TicketService = inject(TicketService);
  tickettypeSvc : TickettypeService = inject(TickettypeService);
  ticketTypes : TicketType[];
  tickets: Ticket[];
  // employees : Employee[];
  errMsg: string;
  ticket: Ticket;
  username : any = sessionStorage.getItem("empId");
  constructor() {
    this.tickets = [];
    // this.employees = [];
    this.ticketTypes = [];
    this.ticket  = new Ticket("","","","",new Date() ,"",this.username ,"")
    this.errMsg = '';
    this.showAllTickets();
    this.getAllTicketType();
  }

    getAllTicketType(): void {
    this.tickettypeSvc.getAllTicketTypes().subscribe({
      next: (response: TicketType[]) => {
        this.ticketTypes = response;
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }
  
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

  showTicket(): void {
    this.ticketSvc.getOneTicket(this.ticket.ticketId).subscribe({
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

  updateTicket(): void {
    this.ticketSvc.updateTicket(this.ticket.ticketId, this.ticket).subscribe({
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

  deleteTicket(): void {
    this.ticketSvc.deleteTicket(this.ticket.ticketId).subscribe({
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

  getTicketsByType(): void {
    this.ticketSvc.getTicketsByType(this.ticket.ticketTypeId).subscribe({
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

  getTicketsByCreator(): void {
    this.ticketSvc.getTicketsByCreator(this.ticket.createdByEmpId).subscribe({
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

  getTicketsAssignedTo(): void {
    this.ticketSvc.getTicketsAssignedTo(this.ticket.assignedToEmpId).subscribe({
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
