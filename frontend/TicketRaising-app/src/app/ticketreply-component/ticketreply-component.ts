import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketReplyService } from '../ticketreply-service';
import { TicketReply } from '../../models/ticketreply';
import { TicketService } from '../ticket-service';
import { Ticket } from '../../models/ticket';
import { EmployeeService } from '../employee-service';

@Component({
  selector: 'app-ticket-reply-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './ticketreply-component.html',
  styleUrl: './ticketreply-component.css',
})
export class TicketReplyComponent {

  replySvc: TicketReplyService = inject(TicketReplyService);
  ticketSvc: TicketService = inject(TicketService);
  employeeSvc: EmployeeService = inject(EmployeeService)
  tickets: Ticket[];
  replier: string;
  createIdStore : string
  assignIdStore : string 
  ticket: Ticket;
  reply: TicketReply;
  replies: TicketReply[] = [];
  errMsg: string = '';

  ticketId: string = '';
  empId: string = '';
  creator: any = sessionStorage.getItem("empId");
  constructor() {
    this.tickets = [];
    this.createIdStore = ""
    this.assignIdStore = ""
    this.ticket = new Ticket("", "", "", "", new Date(), "", "", "")
    this.replier = "";
    this.reply = new TicketReply('', '', '', this.ticket.createdByEmpId, this.ticket.assignedToEmpId);
    this.newReply();
    this.showAllReplies();
    this.showAllTickets();

  }
  
  onReplierChange(value: string) {
    if (value === 'creator') {
      console.log("value : " + value);
       this.reply.replyByAssignedEmpId = "";
      
    }
    else {
      console.log("value : " + value); 
      this.reply.replyByCreatorEmpId = "";

    }
  }


  onTicketIdChange(ticketId: string) {

    this.ticketSvc.getOneTicket(ticketId).subscribe({
      next: (response: Ticket) => {
        this.ticket = response;
        this.reply.replyByAssignedEmpId = this.ticket.assignedToEmpId;
        this.reply.replyByCreatorEmpId = this.ticket.createdByEmpId
        console.log(this.ticket);
        console.log(this.ticket.createdByEmpId);

        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
    // this.newReply()

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
    this.replySvc.getRepliesByTicketId(this.ticketId).subscribe({
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
    this.replySvc.getRepliesByEmployee(this.empId).subscribe({
      next: (res) => {
        this.replies = res;
        this.errMsg = '';
      },
      error: (err) => this.errMsg = err.error
    });
  }


  addReply() {
    console.log(this.reply);
    this.replySvc.addReply(this.reply).subscribe({

      next: () => {
        console.log(this.reply);

        alert('Reply Added Successfully!');
        this.showAllReplies();
        this.newReply();
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