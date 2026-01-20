import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SlaService } from '../sla-service';
import { SLA } from '../../models/sla';

@Component({
  selector: 'app-sla-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './sla-component.html',
  styleUrl: './sla-component.css'
})
export class SlaComponent {

  slaSvc: SlaService = inject(SlaService);

  slas: SLA[];
  errMsg: string;
  sla: SLA;

  constructor() {
    this.slas = [];
    this.sla = new SLA('', '', '', 0, 0);
    this.errMsg = '';
    this.showAllSlas();
  }

  // GET ALL SLAs
  showAllSlas(): void {
    this.slaSvc.getAllSlas().subscribe({
      next: (response: SLA[]) => {
        this.slas = response;
        console.log(response);
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

  // ADD SLA
  addSla(): void {
    this.slaSvc.addSla(this.sla).subscribe({
      next: (response: SLA) => {
        this.slas.push(response);
        this.sla = new SLA('', '', '', 0, 0);
        alert('New SLA added successfully!');
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

  // GET SLA BY ID
  showSla(): void {
    this.slaSvc.getSla(this.sla.slaId).subscribe({
      next: (response: SLA) => {
        this.sla = response;
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

  // UPDATE SLA
  updateSla(): void {
    this.slaSvc.updateSla(this.sla.slaId, this.sla).subscribe({
      next: (response: SLA) => {
        this.showAllSlas();
        alert('SLA details updated successfully!');
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

  // DELETE SLA
  deleteSla(): void {
    this.slaSvc.deleteSla(this.sla.slaId).subscribe({
      next: () => {
        this.showAllSlas();
        alert('SLA deleted successfully!');
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }
}
