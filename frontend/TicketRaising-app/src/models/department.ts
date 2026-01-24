export class Department{
    public deptId: string;
    public deptName: string;
    public description:string;

    constructor(DeptId: string, DeptName: string, Description:string){
        this.deptId = DeptId;
        this.deptName = DeptName;
        this.description = Description;
    }
}
