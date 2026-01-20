import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { NavbarComponent } from './navbar-component/navbar-component';
import { userAccessGuard } from './user-access-guard';
import { DepartmentComponent } from './department-component/department-component';
import { LogoutComponent } from './logout-component/logout-component';
import { SlaComponent } from './sla-component/sla-component';
import { EmployeeComponent } from './employee-component/employee-component';
import { LoginComponent } from './login-component/login-component';
import { TickettypeComponent } from './tickettype-component/tickettype-component';
import { TicketReplyComponent } from './ticketreply-component/ticketreply-component';
import { TicketComponent } from './ticket-component/ticket-component';

export const routes: Routes = [
    {path: '',component:HomeComponent},
    {path: 'employee',component:EmployeeComponent},
    {path: 'department',component:DepartmentComponent},
    {path: 'ticket' , component:TicketComponent},
    {path: 'sla',component:SlaComponent},
    {path: 'navbar',component:NavbarComponent},
    {path: 'tickettype',component:TickettypeComponent},
    {path: 'ticketreply',component:TicketReplyComponent},
    {path: 'logout',component:LogoutComponent},
    {path: 'login',component:LoginComponent}
];
