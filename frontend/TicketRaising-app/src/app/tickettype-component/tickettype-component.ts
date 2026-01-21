import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TickettypeService } from '../tickettype-service';
import { TicketType } from '../../models/tickettype';
import { Department } from '../../models/department';
import { DepartmentService } from '../department-service';
import { SLA } from '../../models/sla';
import { SlaService } from '../sla-service';

@Component({
  selector: 'app-tickettype-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './tickettype-component.html',
  styleUrl: './tickettype-component.css',
})
export class TickettypeComponent {
  tickettypeSvc: TickettypeService = inject(TickettypeService);
  depSvc : DepartmentService = inject(DepartmentService);
  slaSvc : SlaService = inject(SlaService);
  departments : Department[];
  tickettypes: TicketType[];
  slas : SLA[];
  errMsg: string;
  tickettype: TicketType;
  constructor(){
    this.departments = [];
    this.tickettypes = [];
    this.slas = [];
    this.tickettype = new TicketType("","","","","");
    this.errMsg = "";
    this.showAllTicketTypes();
    this.getallDepartment();
    this.getAllSla();
  }
   getallDepartment(): void {
    this.depSvc.getAllDepartments().subscribe({
      next: (response: Department[]) => {
        this.departments = response;
        this.errMsg = '';
      },
       error: (err : any) => {this.errMsg = err.error ; console.log(err);}
    });
  }
   getAllSla(): void {
    this.slaSvc.getAllSlas().subscribe({
      next: (response: SLA[]) => {
        this.slas = response;
        this.errMsg = '';
      },
       error: (err : any) => {this.errMsg = err.error ; console.log(err);}
    });
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
