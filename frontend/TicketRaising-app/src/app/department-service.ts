import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  http: HttpClient = inject(HttpClient);
  token;
  baseUrl: string = "https://ticketportalwebapi-e5a2fee5auazdpgr.canadacentral-01.azurewebsites.net/api/Department/";
  httpOptions;
  
  constructor() {
    this.token = sessionStorage.getItem("token");
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      })
    };
  }

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.baseUrl, this.httpOptions);
  }

  getDepartment(deptId: string): Observable<Department> {
    return this.http.get<Department>(this.baseUrl + deptId, this.httpOptions);
  }

  addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(this.baseUrl, department, this.httpOptions);
  }

  updateDepartment(deptId: string, department: Department): Observable<Department> {
    return this.http.put<Department>(this.baseUrl + deptId, department, this.httpOptions);
  }

  deleteDepartment(deptId: string): Observable<any> {
    return this.http.delete(this.baseUrl + deptId, this.httpOptions);
  }
}