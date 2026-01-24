import { Component, inject } from '@angular/core';
import { AuthService } from '../auth-service';
import { NavbarComponent } from "../navbar-component/navbar-component";
import { EmployeeComponent } from "../employee-component/employee-component";
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [NavbarComponent, EmployeeComponent,RouterLinkActive, RouterLink],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
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
