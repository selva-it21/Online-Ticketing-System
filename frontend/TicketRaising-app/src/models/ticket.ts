export class Ticket{
    public ticketId : string;
    public title : string;
    public description : string;
    public ticketTypeId : string;
    public ticketCreatedDate : Date;
    public status : string;
    public createdByEmpId : string;
    public assignedToEmpId : string;

    constructor(TicketId : string, Title : string, Description : string, TicketTypeId : string, TicketCreatedDate : Date, Status : string, CreatedByEmpId : string, AssignedToEmpId : string){
        this.ticketId = TicketId;
        this.title = Title;
        this.description = Description;
        this.ticketTypeId = TicketTypeId;
        this.ticketCreatedDate = TicketCreatedDate;
        this.status = Status;
        this.createdByEmpId = CreatedByEmpId;
        this.assignedToEmpId = AssignedToEmpId
    }
}