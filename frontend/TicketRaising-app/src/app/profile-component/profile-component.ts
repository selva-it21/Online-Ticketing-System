import { Component, inject } from '@angular/core';
import { EmployeeService } from '../employee-service';
import { Employee } from '../../models/employee';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../department-service';
import { Department } from '../../models/department';

@Component({
  selector: 'app-profile-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.css',
})
export class ProfileComponent {
  empSvc = inject(EmployeeService);
  depSvc: DepartmentService = inject(DepartmentService);
  departments: Department[];
  userid: any = sessionStorage.getItem("empId")
  employee: Employee = new Employee('', '', '', '', '');
  errMsg: string;
  confirmPassword: string = '';
  constructor() {
    this.departments = [];
    this.errMsg = ""
    this.getallDepartment()
    this.showEmployee()
  }

  getallDepartment(): void {
    this.depSvc.getAllDepartments().subscribe({
      next: (response: Department[]) => {
        this.departments = response;
        this.errMsg = '';
      },
      error: (err: any) => { this.errMsg = err.error; console.log(err); }
    });
  }
  showEmployee(): void {
    this.empSvc.getOneEmployee(this.userid).subscribe({
      next: (response: Employee) => {
        this.employee = response;
        this.confirmPassword = response.password
        // console.log(response);

        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }
  showConfirmPassword: boolean = false;
  // confirmPassword: string = '';

  toggleChangePassword() {
    this.showConfirmPassword = !this.showConfirmPassword;

    
    if (!this.showConfirmPassword) {
      this.confirmPassword = '';
    }
  }


  updateEmployee(): void {

    if (this.employee.empId == "") {
      this.errMsg = "Enter Employee id";
      return;
    }
    if (this.employee.password !== this.confirmPassword) {
      this.errMsg = "Passwords do not match.";
      return;
    }
    this.empSvc.updateEmployee(this.employee.empId, this.employee).subscribe({
      next: () => {
        // this.showAllEmployees();
        alert('Employee details updated successfully!');
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }
}
