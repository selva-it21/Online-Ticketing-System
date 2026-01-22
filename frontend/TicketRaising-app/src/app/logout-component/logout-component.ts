import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-logout-component',
  imports: [RouterLinkActive,RouterLink],
  templateUrl: './logout-component.html',
  styleUrl: './logout-component.css',
})
export class LogoutComponent {
  constructor() {
    sessionStorage.clear();
  }
}
