export class TicketReply{
    public ReplyId : string;
    public TicketId : string;
    public ReplyMessage : string;
    public ReplyByCreatorEmpId : string;
    public ReplyByAssignedEmpId : string;

    constructor(ReplyId : string, TicketId : string, ReplyMessage : string, ReplyByCreatorEmpId : string, ReplyByAssignedEmpId : string){
        this.ReplyId = ReplyId;
        this.TicketId = TicketId;
        this.ReplyMessage = ReplyMessage;
        this.ReplyByCreatorEmpId = ReplyByCreatorEmpId;
        this.ReplyByAssignedEmpId = ReplyByAssignedEmpId;
    }
}