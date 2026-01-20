import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee-service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-component.html',
  styleUrl: './employee-component.css',
})
export class EmployeeComponent {

  empSvc: EmployeeService = inject(EmployeeService);
  employees: Employee[];
  errMsg: string;
  employee: Employee;

  constructor() {
    this.employees = [];
    this.employee = {} as Employee;
    this.errMsg = '';
    this.showAllEmployees();
  }

 
  showAllEmployees(): void {
    this.empSvc.showAllEmployee().subscribe({
      next: (response: Employee[]) => {
        this.employees = response;
        this.errMsg = '';
      },
       error: (err : any) => {this.errMsg = err.error ; console.log(err);}
    });
  }

  addEmployee(): void {
    this.empSvc.addEmployee(this.employee).subscribe({
      next: (response: Employee) => {
        this.employees.push(response);
        this.employee = {} as Employee;
        alert('New Employee added successfully!');
        this.errMsg = '';
      },
     error: (err) => {this.errMsg = err.error ; console.log(err);}

    });
  }

  showEmployee(): void {
    this.empSvc.getOneEmployee(this.employee.empId).subscribe({
      next: (response: Employee) => {
        this.employee = response;
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

  
  updateEmployee(): void {
    this.empSvc.updateEmployee(this.employee.empId, this.employee).subscribe({
      next: () => {
        this.showAllEmployees();
        alert('Employee details updated successfully!');
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

  
  deleteEmployee(): void {
    this.empSvc.deleteEmployee(this.employee.empId).subscribe({
      next: () => {
        this.showAllEmployees();
        alert('Employee deleted successfully!');
        this.employee = {} as Employee;
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }
}
