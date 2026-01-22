import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
http: HttpClient= inject(HttpClient);
  baseUrl: string = "http://localhost:5041/api/auth/";
  userName: string = "admin@gmail.com";
  role: string = "admin";
  secretkey: string = "we are Team3 .Net developers from EY India";
  empNameSignal = signal<string | null>(sessionStorage.getItem('empName'));
  getToken(): Observable<string> {
    return this.http.get<string>(this.baseUrl + this.userName + "/" + this.role + "/" + this.secretkey,{ responseType: 'text' as 'json' });
  }

  setLogin(empName: string) {
    sessionStorage.setItem('empName', empName);
    this.empNameSignal.set(empName);
  }
  logout() {
    sessionStorage.clear();
    this.empNameSignal.set(null);
  }
}
