import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee-service';
import { Employee } from '../../models/employee';
import { AuthService } from '../auth-service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  loginSvc: LoginService = inject(LoginService);
  authSvc: AuthService = inject(AuthService);
  user: Employee;
  empId: string;
  password: string;
  errMsg: string;
  router: Router = inject(Router);
 
  constructor() {
    this.user = new Employee("", "", "", "", "Employee");
    this.empId = "";
    this.password = "";
    this.errMsg = "";
  }
  login() {
    this.loginSvc.login(this.empId, this.password).subscribe({
      next: (response: any) => {
        this.user = response;
        alert("Logged in successfully");
        this.authSvc.setLogin(this.user.empName, this.user.empId, this.user.role);
        
        this.errMsg = "";
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.errMsg = err.error; 
        console.log(err);
      }
    });
  }
}