import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { EmployeeService } from '../employee-service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-navbar-component',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  empSvc: EmployeeService = inject(EmployeeService);
  username : string;
  errMsg: string;
  role : string;
  employeeName : string
  constructor(){
    this.errMsg=""
    this.username = sessionStorage.getItem("empId") || "";
    this.employeeName = ""
    this.role = ""
    this.showEmployee()
  }


  showEmployee(): void {
    this.empSvc.getOneEmployee(this.username).subscribe({
      next: (response: Employee) => {
        this.employeeName = response.empName;
        this.role = response.role
        console.log(this.employeeName + "hello");
        
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }

}
