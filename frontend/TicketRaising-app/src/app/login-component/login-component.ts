import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee-service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  loginSvc: EmployeeService = inject(EmployeeService);
  user: Employee;
  empId: string;
  password: string;
  errMsg: string;
  router: Router = inject(Router);
 
  constructor() {
    this.user = new Employee("", "", "", "", "");
    this.empId = "";
    this.password = "";
    this.errMsg = "";
    
  }

  login() {
    this.loginSvc.login(this.empId, this.password).subscribe({
      next: (response: any) => {
        this.user = response;
        alert("Loged in successfull")
        sessionStorage.setItem("empId", this.user.empId);
        sessionStorage.setItem("role", this.user.role);

        this.errMsg = "";
        this.router.navigate(['/']);
      },
      error: (err) => {this.errMsg = err.error ; console.log(err);}
    });
  }
 
}
