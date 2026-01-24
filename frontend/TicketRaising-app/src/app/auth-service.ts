import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkInitialLoginState());
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  
  http: HttpClient = inject(HttpClient);
  baseUrl: string = "https://ticketportalteam3-hwg6cpg9gvbhaje6.canadacentral-01.azurewebsites.net/api/Auth/";
  
  userName: string = "admin@gmail.com";
  role: string = "admin";
  secretkey: string = "we are Team3 .Net developers from EY India";
  
  // Use signals for reactive state
  private empNameSignal = signal<string | null>(this.getStoredEmpName());
  private empIdSignal = signal<string | null>(this.getStoredEmpId());
  private roleSignal = signal<string | null>(this.getStoredRole());
  
  // Computed signals for derived state
  employeeName = computed(() => this.empNameSignal() || '');
  employeeId = computed(() => this.empIdSignal() || '');
  employeeRole = computed(() => this.roleSignal() || '');
  isLoggedIn = computed(() => !!this.empIdSignal());

  private getStoredEmpName(): string | null {
    return sessionStorage.getItem('empName');
  }

  private getStoredEmpId(): string | null {
    return sessionStorage.getItem('empId');
  }

  private getStoredRole(): string | null {
    return sessionStorage.getItem('role');
  }

  private checkInitialLoginState(): boolean {
    return !!this.getStoredEmpId() || !!this.getStoredEmpName();
  }

  getToken(): Observable<string> {
    return this.http.get<string>(
      this.baseUrl + this.userName + "/" + this.role + "/" + this.secretkey,
      { responseType: 'text' as 'json' }
    );
  }

  // UPDATED: Accept all user data
  setLogin(empName: string, empId: string, role: string): void {
    sessionStorage.setItem('empName', empName);
    sessionStorage.setItem('empId', empId);
    sessionStorage.setItem('role', role);
    
    // Update all signals
    this.empNameSignal.set(empName);
    this.empIdSignal.set(empId);
    this.roleSignal.set(role);
    
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    sessionStorage.clear();
    this.empNameSignal.set(null);
    this.empIdSignal.set(null);
    this.roleSignal.set(null);
    this.isLoggedInSubject.next(false);
  }
}