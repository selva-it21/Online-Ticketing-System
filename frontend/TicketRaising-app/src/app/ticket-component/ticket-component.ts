import { Component, inject } from '@angular/core';
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
  tickettypeSvc: TickettypeService = inject(TickettypeService);
  empSvc: EmployeeService = inject(EmployeeService);
  isStatusFilter = false;
  role: string;
  ticketTypes: TicketType[];
  employeesbyDept: Employee[];
  tickets: Ticket[];
  ticketsbyAssigner: Ticket[];
  filteredTickets: Ticket[];
  ticketTypeId: string;
  tickettypeStore: TicketType;
  EditbyAssignerNo: boolean;
  employees: Employee[];
  errMsg: string;
  ticket: Ticket;
  ticketsforfiltering: Ticket[];
  username: any = sessionStorage.getItem("empId");
  
  // Separate filter inputs
  filterTicketTypeId: string = "";
  filterCreatedByEmpId: string = "";
  filterAssignedToEmpId: string = "";
  filterStatus: string = "";

  constructor() {
    this.role = "";
    this.employeesbyDept = [];
    this.EditbyAssignerNo = false;
    this.ticketsbyAssigner = [];
    this.tickets = [];
    this.ticketsforfiltering = [];
    this.tickettypeStore = new TicketType("", "", "", "", "");
    this.ticketTypeId = "";
    this.employees = [];
    this.ticketTypes = [];
    this.ticket = new Ticket("", "", "", "", new Date(), "Open", this.username, "");
    this.errMsg = '';
    this.filteredTickets = [];

    this.getAllTicketType();
    this.showEmployee();
  }

  showEmployee(): void {
    this.empSvc.getOneEmployee(this.username).subscribe({
      next: (response: Employee) => {
        this.role = response.role;
        this.errMsg = '';
        if (this.role == "admin") {
          this.showAllTickets();
          this.showAllEmployees();
        } else {
          this.getTicketsByCreator();
          this.getTicketsAssignedTo();
        }
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

  getEmployeesbyDept(): void {
    this.empSvc.getEmployeeByDept(this.ticketTypeId).subscribe({
      next: (response: Employee[]) => {
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
    this.isStatusFilter = false;
    this.ticketSvc.showAllTickets().subscribe({
      next: (response: Ticket[]) => {
        this.tickets = response;
        this.ticketsforfiltering = response;
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

  filterTicketsByStatus(): void {
    this.isStatusFilter = true;
    if (!this.filterStatus) {
      this.errMsg = "Select filter type";
      return;
    } else {
      this.filteredTickets = this.ticketsforfiltering.filter(t => t.status === this.filterStatus);
    }
  }

  onTicketTypeChange(ticketTypeId: string) {
    this.tickettypeSvc.getTicketType(ticketTypeId).subscribe({
      next: (response: TicketType) => {
        const deptId = response.deptId;
        this.empSvc.getEmployeeByDept(deptId).subscribe({
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
    this.EditbyAssignerNo = false;
    this.ticket = { ...t };
    this.onTicketTypeChange(t.ticketTypeId);
  }

  editTicketsbyAssigner(t: Ticket): void {
    this.EditbyAssignerNo = true;
    this.ticket = { ...t };
    this.onTicketTypeChange(t.ticketTypeId);
  }

  addTicket(): void {
    if (this.ticket.ticketId == "") {
      this.errMsg = "Enter Ticket id";
      return;
    }
    if (this.ticket.title == "") {
      this.errMsg = "Title field is required";
      return;
    }
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
        alert('Ticket updated successfully!');
        this.showAllTickets();
        this.getTicketsByCreator();
        this.getTicketsAssignedTo();
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
    this.isStatusFilter = false;
    if (!this.filterTicketTypeId) {
      this.errMsg = "Please select a ticket type";
      return;
    }
    this.ticketSvc.getTicketsByType(this.filterTicketTypeId).subscribe({
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
    this.isStatusFilter = false;
    if (!this.filterCreatedByEmpId) {
      this.errMsg = "Please select an employee";
      return;
    }
    this.ticketSvc.getTicketsByCreator(this.filterCreatedByEmpId).subscribe({
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

  getTicketsAssignedToAdmin(): void {
    this.isStatusFilter = false;
    if (!this.filterAssignedToEmpId) {
      this.errMsg = 'Please select an employee';
      this.tickets = [];
      return;
    }
    this.ticketSvc.getTicketsAssignedTo(this.filterAssignedToEmpId).subscribe({
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
    this.isStatusFilter = false;
    this.ticketSvc.getTicketsAssignedTo(this.username).subscribe({
      next: (response: Ticket[]) => {
        this.ticketsbyAssigner = response;
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

  showAllEmployees(): void {
    this.empSvc.showAllEmployee().subscribe({
      next: (response: Employee[]) => {
        this.employees = response;
        this.errMsg = '';
      },
      error: (err: any) => { this.errMsg = err.error; console.log(err); }
    });
  }
}