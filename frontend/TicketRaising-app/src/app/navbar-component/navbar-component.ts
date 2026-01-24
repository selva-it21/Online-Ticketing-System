import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { EmployeeService } from '../employee-service';
import { Employee } from '../../models/employee';
import { AuthService } from '../auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-component',
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent implements OnInit {
  empSvc: EmployeeService = inject(EmployeeService);
  authSvc = inject(AuthService);
  errMsg: string;
  
  username = this.authSvc.employeeName;
  role = this.authSvc.employeeRole;
  employeeName = this.authSvc.employeeName;
  isLoggedIn = this.authSvc.isLoggedIn;
  
  private employeeData: Employee | null = null;
  
  constructor() {
    this.errMsg = "";
  }

  ngOnInit() {
    this.loadEmployeeData();
    
    // You might want to reload employee data when auth state changes
    // this.authSvc.isLoggedIn$.subscribe(() => {
    //   this.loadEmployeeData();
    // });
  }

  loadEmployeeData(): void {
    if (this.isLoggedIn() && this.username()) {
      this.empSvc.getOneEmployee(this.username()!).subscribe({
        next: (response: Employee) => {
          this.employeeData = response;
          console.log("Employee data loaded:", response);
          this.errMsg = '';
        },
        error: (err) => {
          this.errMsg = err.error;
          console.log("Error loading employee data:", err);
        }
      });
    }
  }

}