import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EmployeeService } from '../employee-service';
import { DepartmentService } from '../department-service';

import { Employee } from '../../models/employee';
import { Department } from '../../models/department';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {
  empSvc = inject(EmployeeService);
  depSvc = inject(DepartmentService);

  employee: Employee = new Employee('', '', '', 'employee', '');
  departments: Department[] = [];
  errMsg: string = '';
  router: Router = inject(Router);
  constructor() {
    this.getAllDepartments();
  }
  getAllDepartments(): void {
    this.depSvc.getAllDepartments().subscribe({
      next: (res: Department[]) => {
        this.departments = res;
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }
  confirmPassword:string='';
  addEmployee(): void {
      if(this.employee.empId == ""){
      this.errMsg = "Enter Employee id";
      return;
    }
    if (this.employee.password !== this.confirmPassword) {
      this.errMsg = "Passwords do not match.";
      return;
    }

    this.empSvc.addEmployee(this.employee).subscribe({
      next: () => {
        alert('Employee registered successfully!');
        this.employee = new Employee('', '', '', 'employee', '');
        this.errMsg = '';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }
}
