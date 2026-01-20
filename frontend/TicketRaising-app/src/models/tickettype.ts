export class TicketType{
    public TicketTypeId : string;
    public TypeName : string;
    public Description : string;
    public SLAId : string;
    public DeptId : string;

    constructor(TicketTypeId : string, TypeName : string, Description : string, SLAId : string, DeptId : string){
        this.TicketTypeId = TicketTypeId;
        this.TypeName = TypeName;
        this.Description = Description;
        this.SLAId = SLAId;
        this.DeptId = DeptId;
    }
}