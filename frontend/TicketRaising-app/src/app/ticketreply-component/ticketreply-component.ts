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
  
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = []; // Only tickets user can access
  replier: string = "";
  createIdStore: string = "";
  assignIdStore: string = "";
  ticket: Ticket;
  reply: TicketReply;
  replies: TicketReply[] = [];
  errMsg: string = '';
  role: string = "";
  ticketId: string = '';
  empId: string = '';
  creator: string = sessionStorage.getItem("empId") || "";
  checkmsg: boolean = true;
  canReply: boolean = false; // New flag to check if user can reply
  
  constructor() {
    this.ticket = new Ticket("", "", "", "", new Date(), "", "", "");
    this.reply = new TicketReply('', '', '', "", "");
    this.newReply();
    this.loadUserData();
    this.errMsg = '';
  }

  loadUserData(): void {
    // Get current employee data
    this.empSvc.getOneEmployee(this.creator).subscribe({
      next: (response: Employee) => {
        this.role = response.role;
        this.empId = response.empId || this.creator;
        this.loadTicketsBasedOnRole();
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = 'Error loading user data: ' + err.error;
        this.role = 'employee'; // Default role
        this.loadTicketsBasedOnRole();
      }
    });
  }

  loadTicketsBasedOnRole(): void {
    if (this.role === 'admin') {
      // Admin can see all tickets
      this.loadAllTickets();
    } else {
      // Employee can only see tickets they created or are assigned to
      this.loadEmployeeTickets();
    }
  }

  loadAllTickets(): void {
    this.ticketSvc.showAllTickets().subscribe({
      next: (response: Ticket[]) => {
        this.tickets = response;
        this.filteredTickets = response;
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = 'Error loading tickets: ' + err.error;
      }
    });
  }

  loadEmployeeTickets(): void {
    this.ticketSvc.showAllTickets().subscribe({
      next: (response: Ticket[]) => {
        this.tickets = response;
        // Filter tickets: only those created by or assigned to current employee
        this.filteredTickets = response.filter(ticket => 
          ticket.createdByEmpId === this.creator || 
          ticket.assignedToEmpId === this.creator
        );
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = 'Error loading tickets: ' + err.error;
      }
    });
  }

  onTicketIdChange(ticketId: string) {
    if (!ticketId) {
      this.resetReplyFields();
      this.canReply = false;
      return;
    }

    // Find the selected ticket
    const selectedTicket = this.tickets.find(t => t.ticketId === ticketId);
    
    if (!selectedTicket) {
      this.errMsg = 'Ticket not found';
      this.canReply = false;
      return;
    }

    this.ticket = selectedTicket;
    this.checkReplyPermission();
    this.getRepliesByTicket();
  }

  checkReplyPermission() {
    if (!this.ticket.ticketId) {
      this.canReply = false;
      return;
    }

    // Check if current user can reply
    const isCreator = this.ticket.createdByEmpId === this.creator;
    const isAssignee = this.ticket.assignedToEmpId === this.creator;
    
    // Only creator or assignee can reply (admin can also reply if they are creator/assignee)
    this.canReply = isCreator || isAssignee;
    
    if (this.canReply) {
      // Auto-set the replyBy fields
      if (isCreator) {
        this.reply.replyByCreatorEmpId = this.creator;
        this.reply.replyByAssignedEmpId = "";
      } else if (isAssignee) {
        this.reply.replyByAssignedEmpId = this.creator;
        this.reply.replyByCreatorEmpId = "";
      }
      this.checkmsg = true;
    } else {
      this.checkmsg = false;
      this.reply.replyByCreatorEmpId = "";
      this.reply.replyByAssignedEmpId = "";
    }
  }

  resetReplyFields() {
    this.reply.ticketId = "";
    this.reply.replyByCreatorEmpId = "";
    this.reply.replyByAssignedEmpId = "";
    this.reply.replyMessage = "";
    this.canReply = false;
    this.checkmsg = false;
    this.replies = [];
    this.ticket = new Ticket("", "", "", "", new Date(), "", "", "");
  }

  getRepliesByTicket() {
    if (!this.reply.ticketId) return;
    
    this.replySvc.getRepliesByTicketId(this.reply.ticketId).subscribe({
      next: (res) => {
        this.replies = res;
        this.errMsg = '';
      },
      error: (err) => this.errMsg = err.error
    });
  }

  newReply() {
    this.reply = new TicketReply('', "", '', "", "");
  }

  getReply() {
    if (!this.reply.replyId) {
      this.errMsg = "Please enter a reply ID";
      return;
    }
    
    this.replySvc.getReplyById(this.reply.replyId).subscribe({
      next: (res) => {
        this.reply = res;
        // Load the associated ticket
        if (res.ticketId) {
          this.ticketSvc.getOneTicket(res.ticketId).subscribe({
            next: (ticketRes) => {
              this.ticket = ticketRes;
              this.checkReplyPermission();
            },
            error: (err) => this.errMsg = err.error
          });
        }
        this.errMsg = '';
      },
      error: (err) => this.errMsg = err.error
    });
  }

  addReply() {
    if (!this.canReply) {
      this.errMsg = "You are not authorized to reply to this ticket.";
      return;
    }

    if (!this.reply.replyId) {
      this.errMsg = "Please enter a reply ID";
      return;
    }
    
    if (!this.reply.replyMessage.trim()) {
      this.errMsg = "Reply message cannot be empty";
      return;
    }

    this.replySvc.addReply(this.reply).subscribe({
      next: () => {
        alert('Reply Added Successfully!');
        this.getRepliesByTicket();
        this.newReply();
        this.errMsg = '';
      },
      error: (err) => this.errMsg = err.error
    });
  }

  updateReply() {
    if (!this.canReply) {
      this.errMsg = "You are not authorized to update replies.";
      return;
    }

    this.replySvc.updateReply(this.reply.replyId, this.reply).subscribe({
      next: () => {
        alert('Reply Updated Successfully!');
        this.getRepliesByTicket();
        this.errMsg = '';
      },
      error: (err) => this.errMsg = err.error
    });
  }

  deleteReply() {
    if (!this.canReply) {
      this.errMsg = "You are not authorized to delete replies.";
      return;
    }

    if (confirm('Are you sure you want to delete this reply?')) {
      this.replySvc.deleteReply(this.reply.replyId).subscribe({
        next: () => {
          alert('Reply Deleted Successfully!');
          this.getRepliesByTicket();
          this.newReply();
          this.errMsg = '';
        },
        error: (err) => this.errMsg = err.error
      });
    }
  }

  // Admin-only function to see all replies
  showAllReplies() {
    if (this.role !== 'admin') {
      this.errMsg = "Only admin can view all replies.";
      return;
    }
    
    this.replySvc.getAllReplies().subscribe({
      next: (res) => {
        this.replies = res;
        this.errMsg = '';
      },
      error: (err) => this.errMsg = err.error
    });
  }
}