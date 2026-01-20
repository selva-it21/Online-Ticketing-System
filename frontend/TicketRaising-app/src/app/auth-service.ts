import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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
  getToken(): Observable<string> {
    return this.http.get<string>(this.baseUrl + this.userName + "/" + this.role + "/" + this.secretkey,{ responseType: 'text' as 'json' });
  }
}
