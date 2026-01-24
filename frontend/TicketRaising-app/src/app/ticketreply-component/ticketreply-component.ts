import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketReplyService } from '../ticketreply-service';
import { TicketReply } from '../../models/ticketreply';
import { TicketService } from '../ticket-service';
import { Ticket } from '../../models/ticket';
import { EmployeeService } from '../employee-service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-ticket-reply-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './ticketreply-component.html',
  styleUrl: './ticketreply-component.css',
})
export class TicketReplyComponent {

  replySvc: TicketReplyService = inject(TicketReplyService);
  ticketSvc: TicketService = inject(TicketService);
  empSvc: EmployeeService = inject(EmployeeService);
  tickets: Ticket[];
  replier: string;
  createIdStore: string;
  assignIdStore: string;
  ticket: Ticket;
  reply: TicketReply;
  replies: TicketReply[] = [];
  errMsg: string = '';
  role: string = "";
  ticketId: string = '';
  empId: string = '';
  creator: any = sessionStorage.getItem("empId");
  checkmsg: boolean;
  
  constructor() {
    this.tickets = [];
    this.checkmsg = true;
    this.createIdStore = "";
    this.assignIdStore = "";
    this.ticket = new Ticket("", "", "", "", new Date(), "", "", "");
    this.replier = "";
    this.reply = new TicketReply('', '', '', this.ticket.createdByEmpId, this.ticket.assignedToEmpId);
    this.newReply();
    this.showTicket();
    this.showAllTickets();
    this.showEmployee();
    this.errMsg = '';
  }

  showEmployee(): void {
    this.empSvc.getOneEmployee(this.creator).subscribe({
      next: (response: Employee) => {
        this.role = response.role;
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
      }
    });
  }

  onTicketIdChange(ticketId: string) {
    this.ticketSvc.getOneTicket(ticketId).subscribe({
      next: (response: Ticket) => {
        this.ticket = response;
        this.getRepliesByTicket();
        const loggedInEmpId = sessionStorage.getItem("empId") || "";
        
        if (loggedInEmpId === this.ticket.createdByEmpId) {
          this.reply.replyByCreatorEmpId = loggedInEmpId;
          this.reply.replyByAssignedEmpId = "";
          this.checkmsg = true;
        } else if (loggedInEmpId === this.ticket.assignedToEmpId) {
          this.checkmsg = true;
          this.reply.replyByAssignedEmpId = loggedInEmpId;
          this.reply.replyByCreatorEmpId = "";
        } else {
          this.checkmsg = false;
          this.reply.replyByCreatorEmpId = "";
          this.reply.replyByAssignedEmpId = "";
          return;
        }

        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
      }
    });
  }

  autoSetReplier(): void {
    const loggedInEmpId = sessionStorage.getItem("empId") || "";

    if (this.ticket && this.ticket.ticketId) {
      if (loggedInEmpId === this.ticket.createdByEmpId) {
        this.reply.replyByCreatorEmpId = loggedInEmpId;
        this.reply.replyByAssignedEmpId = "";
        this.replier = "creator";
      } else if (loggedInEmpId === this.ticket.assignedToEmpId) {
        this.reply.replyByAssignedEmpId = loggedInEmpId;
        this.reply.replyByCreatorEmpId = "";
        this.replier = "assigner";
      } else {
        this.reply.replyByCreatorEmpId = "";
        this.reply.replyByAssignedEmpId = "";
        this.replier = "";
      }
    }
  }

  onReplierChange(value: string) {
    if (value === 'creator') {
      this.reply.replyByCreatorEmpId = this.ticket.createdByEmpId;
      this.reply.replyByAssignedEmpId = "";
    } else if (value === 'assigner') {
      this.reply.replyByAssignedEmpId = this.ticket.assignedToEmpId;
      this.reply.replyByCreatorEmpId = "";
    } else {
      this.reply.replyByCreatorEmpId = "";
      this.reply.replyByAssignedEmpId = "";
    }
  }

  newReply() {
    this.reply = new TicketReply('', "", '', "", "");
  }

  showAllTickets(): void {
    this.ticketSvc.showAllTickets().subscribe({
      next: (response: Ticket[]) => {
        this.tickets = response;
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
      }
    });
  }

  showAllReplies() {
    this.replySvc.getAllReplies().subscribe({
      next: (res) => {
        this.replies = res;
        this.errMsg = '';
      },
      error: (err) => this.errMsg = err.error
    });
  }

  getReply() {
    this.replySvc.getReplyById(this.reply.replyId).subscribe({
      next: (res) => {
        this.reply = res;
        this.errMsg = '';
      },
      error: (err) => this.errMsg = err.error
    });
  }

  getRepliesByTicket() {
    this.replySvc.getRepliesByTicketId(this.reply.ticketId).subscribe({
      next: (res) => {
        this.replies = res;
        this.errMsg = '';
      },
      error: (err) => this.errMsg = err.error
    });
  }

  getRepliesByCreator() {
    this.replySvc.getRepliesByCreator(this.empId).subscribe({
      next: (res) => {
        this.replies = res;
        this.errMsg = '';
      },
      error: (err) => this.errMsg = err.error
    });
  }

  getRepliesByAssigned() {
    this.replySvc.getRepliesByAssigned(this.empId).subscribe({
      next: (res) => {
        this.replies = res;
        this.errMsg = '';
      },
      error: (err) => this.errMsg = err.error
    });
  }

  getRepliesByEmployee() {
    this.replySvc.getRepliesByEmployee(this.creator).subscribe({
      next: (res) => {
        this.replies = res;
        this.errMsg = '';
      },
      error: (err) => this.errMsg = err.error
    });
  }

  showTicket(): void {
    this.ticketSvc.getOneTicket(this.reply.ticketId).subscribe({
      next: (response: Ticket) => {
        this.ticket = response;
        this.autoSetReplier();
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
      }
    });
  }

  addReply() {
    const loggedInEmpId = sessionStorage.getItem("empId") || "";

    if (this.reply.replyId == "") {
      this.errMsg = "Enter reply id";
      return;
    }
    
    if(this.reply.replyMessage == "") {
      this.errMsg = "Reply field can't be empty";
      return;
    }
    
    this.replySvc.addReply(this.reply).subscribe({
      next: () => {
        alert('Reply Added Successfully!');
        this.showAllReplies();
        this.newReply();
        this.ticket = new Ticket("", "", "", "", new Date(), "", "", "");
        this.replier = "";
      },
      error: (err) => this.errMsg = err.error
    });
  }

  updateReply() {
    this.replySvc.updateReply(this.reply.replyId, this.reply).subscribe({
      next: () => {
        alert('Reply Updated Successfully!');
        this.showAllReplies();
        this.newReply();
      },
      error: (err) => this.errMsg = err.error
    });
  }

  deleteReply() {
    this.replySvc.deleteReply(this.reply.replyId).subscribe({
      next: () => {
        alert('Reply Deleted Successfully!');
        this.showAllReplies();
        this.newReply();
      },
      error: (err) => this.errMsg = err.error
    });
  }
}