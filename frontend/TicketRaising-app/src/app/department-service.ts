import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://localhost:5041/api/Department';

  constructor(private http: HttpClient) { }

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  getDepartment(deptId: string): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${deptId}`);
  }

  addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, department);
  }

  updateDepartment(deptId: string, department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/${deptId}`, department);
  }

  deleteDepartment(deptId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${deptId}`);
  }
}