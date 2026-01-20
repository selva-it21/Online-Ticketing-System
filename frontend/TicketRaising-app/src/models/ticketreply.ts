export class TicketReply{
    public replyId : string;
    public ticketId : string;
    public replyMessage : string;
    public replyByCreatorEmpId : string;
    public replyByAssignedEmpId : string;

    constructor(ReplyId : string, TicketId : string, ReplyMessage : string, ReplyByCreatorEmpId : string, ReplyByAssignedEmpId : string){
        this.replyId = ReplyId;
        this.ticketId = TicketId;
        this.replyMessage = ReplyMessage;
        this.replyByCreatorEmpId = ReplyByCreatorEmpId;
        this.replyByAssignedEmpId = ReplyByAssignedEmpId;
    }
}