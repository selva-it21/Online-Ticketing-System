using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TicketRaisingLibrary.Models
{
    [Table("TicketReply")]
    public class TicketReply
    {
        [Key] 
        [Column(TypeName = "CHAR(6)")]
        public string? ReplyId { get; set; }

        [Column(TypeName = "CHAR(4)")]
        public string? TicketId { get; set; }

        [Column(TypeName = "CHAR(100)")]
        public string? ReplyMessage { get; set; }
        
        [Column(TypeName = "CHAR(4)")]

        public string? ReplyByCreatorEmpId { get; set; }

        [Column(TypeName = "CHAR(4)")]
        public string? ReplyByAssignedEmpId { get; set; }

        [ForeignKey("TicketId")]
        public virtual Ticket? Ticket { get; set; }

        [ForeignKey("ReplyByCreatorEmpId")]
        public virtual Employee? ReplyByCreator { get; set; }

        [ForeignKey("ReplyByAssignedEmpId")]
        public virtual Employee? ReplyByAssigned { get; set; }
    }
}
