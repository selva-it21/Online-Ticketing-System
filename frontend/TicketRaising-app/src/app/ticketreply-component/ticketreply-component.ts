import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketReplyService } from '../ticketreply-service';
import { TicketReply } from '../../models/ticketreply';

@Component({
  selector: 'app-ticket-reply-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './ticketreply-component.html',
  styleUrl: './ticketreply-component.css',
})
export class TicketReplyComponent {

  replySvc: TicketReplyService = inject(TicketReplyService);

  reply!: TicketReply;
  replies: TicketReply[] = [];
  errMsg: string = '';

  // filters
  ticketId: string = '';
  empId: string = '';

  constructor() {
    this.newReply();
    this.showAllReplies();
  }

  newReply() {
    this.reply = new TicketReply('', '', '', '', '');
  }

  // ===== GET =====

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

  // ===== POST =====

  addReply() {
    this.replySvc.addReply(this.reply).subscribe({
      next: () => {
        alert('Reply Added Successfully!');
        this.showAllReplies();
        this.newReply();
      },
      error: (err) => this.errMsg = err.error
    });
  }

  // ===== PUT =====

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

  // ===== DELETE =====

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
