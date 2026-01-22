import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DepartmentComponent } from "./department-component/department-component";
import { HomeComponent } from "./home-component/home-component";
import { NavbarComponent } from "./navbar-component/navbar-component";
import { EmployeeComponent } from "./employee-component/employee-component";
import { AuthService } from './auth-service';

@Component({
  selector: 'app-root',
  imports: [DepartmentComponent, HomeComponent, NavbarComponent, EmployeeComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TicketRaising-app');
  auth=inject(AuthService);
  empName=signal(sessionStorage.getItem('empName'));
}
