import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkInitialLoginState());
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  
  http: HttpClient = inject(HttpClient);
  baseUrl: string = "https://ticketportalwebapi-e5a2fee5auazdpgr.canadacentral-01.azurewebsites.net/api/Auth/";
  
  userName: string = "admin@gmail.com";
  role: string = "admin";
  secretkey: string = "we are Team3 .Net developers from EY India";
  
  empNameSignal = signal<string | null>(sessionStorage.getItem('empName'));

  private checkInitialLoginState(): boolean {
    return !!sessionStorage.getItem('empId') || !!sessionStorage.getItem('empName');
  }

  getToken(): Observable<string> {
    return this.http.get<string>(
      this.baseUrl + this.userName + "/" + this.role + "/" + this.secretkey,
      { responseType: 'text' as 'json' }
    );
  }

  // UPDATED: Accept empName parameter and update state
  setLogin(empName: string): void {
    sessionStorage.setItem('empName', empName);
    this.isLoggedInSubject.next(true);
    this.empNameSignal.set(empName);
  }

  logout(): void {
    sessionStorage.clear();
    this.isLoggedInSubject.next(false);
    this.empNameSignal.set(null);
  }
}