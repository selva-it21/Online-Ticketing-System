export class Employee{
    public EmpId : string;
    public EmpName : string;
    public Password : string;
    public Role : string;
    public DeptId : string;

    constructor(EmpId : string, EmpName : string, Password : string, Role : string, DeptId : string){
        this.EmpId = EmpId;
        this.EmpName = EmpName;
        this.Password = Password;
        this.Role = Role;
        this.DeptId = DeptId;
    }
}