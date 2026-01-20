import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../department-service';
import { Department } from '../../models/department';

@Component({
  selector: 'app-department-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './department-component.html',
  styleUrl: './department-component.css',
})
export class DepartmentComponent {
  departmentSvc: DepartmentService = inject(DepartmentService);
  departments: Department[];
  errMsg: string;
  department: Department;
  
  constructor() {
    this.departments = [];
    this.department = new Department("", "", "");
    this.errMsg = "";
    this.showAllDepartments();
  }

  showAllDepartments(): void {
    this.departmentSvc.getAllDepartments().subscribe({
      next: (response: Department[]) => {
        this.departments = response;
        console.log(response);
        this.errMsg = "";
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }
  
  addDepartment(): void {
    this.departmentSvc.addDepartment(this.department).subscribe({
      next: (response: Department) => {
        this.departments.push(response);
        this.department = new Department("", "", "");
        alert("New Department added successfully!");
        this.errMsg = "";
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }
  
  showDepartment(): void {
    this.departmentSvc.getDepartment(this.department.deptId).subscribe({
      next: (response: Department) => {
        this.department = response;
        this.errMsg = "";
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }
  
  updateDepartment(): void {
    this.departmentSvc.updateDepartment(this.department.deptId, this.department).subscribe({
      next: (response: Department) => {
        this.showAllDepartments();
        alert("Department details updated successfully!");
        this.errMsg = "";
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }
  
  deleteDepartment(): void {
    this.departmentSvc.deleteDepartment(this.department.deptId).subscribe({
      next: () => {
        this.showAllDepartments();
        alert("Department data deleted successfully!");
        this.errMsg = "";
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }
}