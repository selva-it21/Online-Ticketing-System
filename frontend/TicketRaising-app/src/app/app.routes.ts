import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { NavbarComponent } from './navbar-component/navbar-component';
import { userAccessGuard } from './user-access-guard';
import { DepartmentComponent } from './department-component/department-component';
import { LogoutComponent } from './logout-component/logout-component';

export const routes: Routes = [
    {path: '',component:HomeComponent},
    {path: 'employee',component:NavbarComponent, canActivate: [userAccessGuard]},
    {path: 'department',component:DepartmentComponent},
    {path: 'logout',component:LogoutComponent, canActivate: [userAccessGuard]},
    {path: 'Navbar',component:NavbarComponent}
];
