export class Department{
    public DeptId: string;
    public DeptName: string;
    public Description:string;

    constructor(DeptId: string, DeptName: string, Description:string){
        this.DeptId = DeptId;
        this.DeptName = DeptName;
        this.Description = Description;
    }
}
