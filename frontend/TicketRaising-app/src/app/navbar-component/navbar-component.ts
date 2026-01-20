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
  // employeeName : string
  // username :any
  // errMsg = ""
  // constructor(){
  //   this.username="";
  //   this.employeeName = ""
  //   this.errMsg = "";

  // }
  
  
  username = sessionStorage.getItem("empId");
  //  showEmployee(): void {
  //   this.empSvc.getOneEmployee(this.username).subscribe({
  //     next: (response: Employee) => {
  //       this.employeeName = response.empName;

  //       this.errMsg = '';
  //     },
  //     error: (err) => {
  //       this.errMsg = err.error;
  //       console.log(err);
  //     }
  //   });
  // }
}
