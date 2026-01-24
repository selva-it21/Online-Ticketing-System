import { Component, inject, HostListener } from '@angular/core';
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
export class NavbarComponent {
  empSvc: EmployeeService = inject(EmployeeService);
  authSvc = inject(AuthService);
  errMsg: string;
  
  username = this.authSvc.employeeName;
  role = this.authSvc.employeeRole;
  employeeName = this.authSvc.employeeName;
  isLoggedIn = this.authSvc.isLoggedIn;
  
  isDropdownOpen = false;
  
  private employeeData: Employee | null = null;
  
  constructor() {
    this.errMsg = "";
    this.loadEmployeeData();
  }

  loadEmployeeData(): void {
    if (this.isLoggedIn() && this.username()) {
      this.empSvc.getOneEmployee(this.username()!).subscribe({
        next: (response: Employee) => {
          this.employeeData = response;
          this.errMsg = '';
        },
        error: (err) => {
          this.errMsg = err.error;
        }
      });
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-dropdown')) {
      this.isDropdownOpen = false;
    }
  }
}