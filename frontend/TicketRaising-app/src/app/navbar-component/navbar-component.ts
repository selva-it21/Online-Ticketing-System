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
  username = sessionStorage.getItem("empId");
}
