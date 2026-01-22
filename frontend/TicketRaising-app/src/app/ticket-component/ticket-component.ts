import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../models/ticket';
import { TicketService } from '../ticket-service';
import { TickettypeService } from '../tickettype-service';
import { TicketType } from '../../models/tickettype';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../employee-service';

@Component({
  selector: 'app-ticket-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './ticket-component.html',
  styleUrl: './ticket-component.css',
})
export class TicketComponent {

  ticketSvc: TicketService = inject(TicketService);
  tickettypeSvc : TickettypeService = inject(TickettypeService);
  employeeSvc : EmployeeService = inject(EmployeeService)
  @ViewChild('ticketFormContainer') ticketFormContainer!: ElementRef;

  ticketTypes : TicketType[];
  employeesbyDept : Employee[]
  tickets: Ticket[];
  ticketTypeId : string;
  tickettypeStore : TicketType;
  // employees : Employee[];
  errMsg: string;
  ticket: Ticket;
  username : any = sessionStorage.getItem("empId");
  constructor() {
    this.employeesbyDept = [];
    this.tickets = [];
    this.tickettypeStore = new TicketType("","","","","");
    this.ticketTypeId = "";
    // this.employees = [];
    this.ticketTypes = [];
    this.ticket  = new Ticket("","","","",new Date() ,"",this.username ,"")
    this.errMsg = '';
    this.showAllTickets();
    this.getAllTicketType();

  }

  getEmployeesbyDept(): void {
    this.employeeSvc.getEmployeeByDept(this.ticketTypeId).subscribe({
      next: (response: Employee[]) => {
        console.log(response);
        
        this.employeesbyDept = response;
        this.errMsg = '';
      },
       error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
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
 onTicketTypeChange(ticketTypeId: string) {
  this.tickettypeSvc.getTicketType(ticketTypeId).subscribe({
    next: (response: TicketType) => {

      const deptId = response.deptId;

      console.log('Dept ID:', deptId);

      this.employeeSvc.getEmployeeByDept(deptId).subscribe({
        next: (emps: Employee[]) => {
          this.employeesbyDept = emps;
        },
        error: err => console.log(err)
      });

    },
    error: err => console.log(err)
  });
}
editTicket(t: Ticket): void {
  // Copy ticket data into form
  this.ticket = { ...t };

  // Scroll to form
  setTimeout(() => {
    this.ticketFormContainer.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, 0);
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
        console.log(response);
        
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
