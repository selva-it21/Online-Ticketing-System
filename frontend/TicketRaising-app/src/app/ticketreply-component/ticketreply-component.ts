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

  constructor() {
    this.tickets = [];
    this.createIdStore = "";
    this.assignIdStore = "";
    this.ticket = new Ticket("", "", "", "", new Date(), "", "", "");
    this.replier = "";
    this.reply = new TicketReply('', '', '', this.ticket.createdByEmpId, this.ticket.assignedToEmpId);
    this.newReply();
    this.showTicket();
    this.showAllTickets();
    this.showEmployee();
  }

  showEmployee(): void {
    this.empSvc.getOneEmployee(this.creator).subscribe({
      next: (response: Employee) => {
        this.role = response.role;
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

  // UPDATED: MODIFIED onTicketIdChange METHOD
  onTicketIdChange(ticketId: string) {
    this.ticketSvc.getOneTicket(ticketId).subscribe({
      next: (response: Ticket) => {
        this.ticket = response;
        this.getRepliesByTicket();
        // Get current logged-in user's empId from sessionStorage
        const loggedInEmpId = sessionStorage.getItem("empId") || "";
        
        // Check if logged-in user is the creator or assigner
        if (loggedInEmpId === this.ticket.createdByEmpId) {
          // User is the creator
          this.reply.replyByCreatorEmpId = loggedInEmpId;
          this.reply.replyByAssignedEmpId = "";
          console.log('User is creator, setting replyByCreatorEmpId:', loggedInEmpId);
        } else if (loggedInEmpId === this.ticket.assignedToEmpId) {
          // User is the assigner
          this.reply.replyByAssignedEmpId = loggedInEmpId;
          this.reply.replyByCreatorEmpId = "";
          console.log('User is assigner, setting replyByAssignedEmpId:', loggedInEmpId);
        } else {
          // User is neither creator nor assigner
          console.log('User is not authorized to reply to this ticket');
          this.errMsg = 'You are not authorized to reply to this ticket';
          this.reply.replyByCreatorEmpId = "";
          this.reply.replyByAssignedEmpId = "";
          return;
        }
        
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

  // ADD THIS METHOD TO AUTOMATICALLY SET REPLIER BASED ON LOGGED-IN USER
  autoSetReplier(): void {
    // Get current logged-in user's empId from sessionStorage
    const loggedInEmpId = sessionStorage.getItem("empId") || "";
    
    if (this.ticket && this.ticket.ticketId) {
      if (loggedInEmpId === this.ticket.createdByEmpId) {
        // User is the creator
        this.reply.replyByCreatorEmpId = loggedInEmpId;
        this.reply.replyByAssignedEmpId = "";
        this.replier = "creator";
        console.log('Auto-set: User is creator');
      } else if (loggedInEmpId === this.ticket.assignedToEmpId) {
        // User is the assigner
        this.reply.replyByAssignedEmpId = loggedInEmpId;
        this.reply.replyByCreatorEmpId = "";
        this.replier = "assigner";
        console.log('Auto-set: User is assigner');
      } else {
        // User is neither creator nor assigner
        this.errMsg = 'You are not authorized to reply to this ticket';
        this.reply.replyByCreatorEmpId = "";
        this.reply.replyByAssignedEmpId = "";
        this.replier = "";
      }
    }
  }

  // MODIFIED: onReplierChange method to handle manual selection if still needed
  onReplierChange(value: string) {
    if (value === 'creator') {
      console.log("value : " + value);
      this.reply.replyByCreatorEmpId = this.ticket.createdByEmpId;
      this.reply.replyByAssignedEmpId = "";
    }
    else if (value === 'assigner') {
      console.log("value : " + value);
      this.reply.replyByAssignedEmpId = this.ticket.assignedToEmpId;
      this.reply.replyByCreatorEmpId = "";
    }
    else {
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
        console.log(err);
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
        console.log(res);
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
        console.log(this.ticket);
        // Auto-set replier when ticket is loaded
        this.autoSetReplier();
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

  addReply() {
    // Validate that reply is from authorized user
    const loggedInEmpId = sessionStorage.getItem("empId") || "";
    
    if (this.reply.replyByCreatorEmpId !== loggedInEmpId && 
        this.reply.replyByAssignedEmpId !== loggedInEmpId) {
      this.errMsg = "You are not authorized to reply to this ticket";
      return;
    }
    
    if (this.reply.replyId == "") {
      this.errMsg = "Enter reply id";
      return;
    }
    
    this.replySvc.addReply(this.reply).subscribe({
      next: () => {
        console.log(this.reply);
        alert('Reply Added Successfully!');
        this.showAllReplies();
        this.newReply();
        // Clear the ticket selection
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