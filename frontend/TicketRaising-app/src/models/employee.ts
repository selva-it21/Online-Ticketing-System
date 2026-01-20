export class Employee{
    public empId : string;
    public empName : string;
    public password : string;
    public role : string;
    public deptId : string;

    constructor(EmpId : string, EmpName : string, Password : string, Role : string, DeptId : string){
        this.empId = EmpId;
        this.empName = EmpName;
        this.password = Password;
        this.role = Role;
        this.deptId = DeptId;
    }
}