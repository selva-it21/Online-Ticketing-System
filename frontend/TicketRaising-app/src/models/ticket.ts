export class Ticket{
    public TicketId : string;
    public Title : string;
    public Description : string;
    public TicketTypeId : string;
    public TicketCreatedDate : Date;
    public Status : string;
    public CreatedByEmpId : string;
    public AssignedToEmpId : string;

    constructor(TicketId : string, Title : string, Description : string, TicketTypeId : string, TicketCreatedDate : Date, Status : string, CreatedByEmpId : string, AssignedToEmpId : string){
        this.TicketId = TicketId;
        this.Title = Title;
        this.Description = Description;
        this.TicketTypeId = TicketTypeId;
        this.TicketCreatedDate = TicketCreatedDate;
        this.Status = Status;
        this.CreatedByEmpId = CreatedByEmpId;
        this.AssignedToEmpId = AssignedToEmpId
    }
}