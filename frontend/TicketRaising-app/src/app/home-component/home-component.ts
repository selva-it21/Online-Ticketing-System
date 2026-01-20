import { Component, inject } from '@angular/core';
import { AuthService } from '../auth-service';
import { NavbarComponent } from "../navbar-component/navbar-component";

@Component({
  selector: 'app-home-component',
  imports: [NavbarComponent],
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
