export class TicketType{
    public ticketTypeId : string;
    public typeName : string;
    public description : string;
    public sLAId : string;
    public deptId : string;

    constructor(TicketTypeId : string, TypeName : string, Description : string, SLAId : string, DeptId : string){
        this.ticketTypeId = TicketTypeId;
        this.typeName = TypeName;
        this.description = Description;
        this.sLAId = SLAId;
        this.deptId = DeptId;
    }
}