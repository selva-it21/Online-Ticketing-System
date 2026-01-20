import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TickettypeService } from '../tickettype-service';
import { TicketType } from '../../models/tickettype';

@Component({
  selector: 'app-tickettype-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './tickettype-component.html',
  styleUrl: './tickettype-component.css',
})
export class TickettypeComponent {
  tickettypeSvc: TickettypeService = inject(TickettypeService);
  tickettypes: TicketType[];
  errMsg: string;
  tickettype: TicketType;
  constructor(){
    this.tickettypes = [];
    this.tickettype = new TicketType("","","","","");
    this.errMsg = "";
    this.showAllTicketTypes();
  }

  showAllTicketTypes(): void{
    this.tickettypeSvc.getAllTicketTypes().subscribe({
      next: (response: TicketType[]) => {
        this.tickettypes = response;
        console.log(response);

        this.errMsg = "";
      },
      error: (err) => {this.errMsg = err.error; console.log(err);}
    });
  }

  addTicketType(): void {
    this.tickettypeSvc.addTicketType(this.tickettype).subscribe({
      next: (response: TicketType) => {
        this.tickettypes.push(response); 
        this.tickettype = new TicketType('', '', '', '', ''); 
        alert('New TicketType added successfully!');
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      },
    });
  }

  showTicketType(): void {
    this.tickettypeSvc.getTicketType(this.tickettype.ticketTypeId).subscribe({
      next: (response: TicketType) => {
        this.tickettype = response; 
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      },
    });
  }

 
  updateTicketType(): void {
    this.tickettypeSvc.updateTicketType(this.tickettype.ticketTypeId, this.tickettype).subscribe({
      next: (response: TicketType) => {
        this.showAllTicketTypes();
        alert('TicketType details updated successfully!');
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      },
    });
  }

  
  deleteTicketType(): void {
    this.tickettypeSvc.deleteTicketType(this.tickettype.ticketTypeId).subscribe({
      next: () => {
        this.showAllTicketTypes(); 
        alert('TicketType deleted successfully!');
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      },
    });
  }
}
