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
   authSvc: AuthService = inject(AuthService);
  token: string = "";
  constructor() {
    this.authSvc.getToken().subscribe({
      next: (response: any) => {
        this.token = response;
        sessionStorage.setItem("token", this.token);
        console.log(this.token);
      },
      error: (err) => { alert(err.message); console.log(err); }
    });
  }
}
