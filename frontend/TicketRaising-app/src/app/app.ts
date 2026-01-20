import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DepartmentComponent } from "./department-component/department-component";
import { HomeComponent } from "./home-component/home-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DepartmentComponent, HomeComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TicketRaising-app');
}
