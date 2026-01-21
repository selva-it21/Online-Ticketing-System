import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {

    http: HttpClient = inject(HttpClient);
    token;
    baseUrl: string = "http://localhost:5041/api/Employee/";
    httpOptions;
    constructor() {
        this.token = sessionStorage.getItem("token");
        this.httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.token
            })
        };
    }

    showAllEmployee(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.baseUrl, this.httpOptions);
    }
    getOneEmployee(empid: string): Observable<Employee> {
        return this.http.get<Employee>(this.baseUrl + empid, this.httpOptions);
    }

    addEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(
            this.baseUrl,
            employee,
            this.httpOptions
        );
    }


    updateEmployee(empid: string, employee: Employee): Observable<any> {
        return this.http.put(
            this.baseUrl + empid,
            employee,
            this.httpOptions
        );
    }


    deleteEmployee(empid: string): Observable<any> {
        return this.http.delete(
            this.baseUrl + empid,
            this.httpOptions
        );
    }
    getEmployeeByDept(deptId: string): Observable<Employee[]> {
        return this.http.get<Employee[]>(
            `${this.baseUrl}department/${deptId}`,
            this.httpOptions
        );
    }

    login(empId: string, password: string): Observable<Employee> {
        console.log(empId);
        console.log(password);
        // console.log("hi");

        return this.http.get<Employee>(this.baseUrl + empId + "/" + password, this.httpOptions);
    }
}
