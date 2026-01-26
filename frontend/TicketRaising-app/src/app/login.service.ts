import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
http: HttpClient = inject(HttpClient);
    token;
    baseUrl: string = "http://localhost:5041/api/Login/";
    httpOptions;
    constructor() {
        this.token = sessionStorage.getItem("token");
        this.httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.token
            })
        };
    }  
        login(empId: string, password: string): Observable<Employee> {
        return this.http.get<Employee>(this.baseUrl + empId + "/" + password, this.httpOptions);
    }
}
