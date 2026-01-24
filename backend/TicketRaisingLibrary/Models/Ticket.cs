using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
 
namespace TicketRaisingLibrary.Models
{
    [Table("Ticket")]
    public class Ticket
    {
        [Key]
        [Column(TypeName = "CHAR(4)")]
        public string? TicketId { get; set; }

        [Column(TypeName = "CHAR(100)")]
        public string? Title { get; set; }

        [Column(TypeName = "CHAR(50)")]
        public string? Description { get; set; }

        [Column(TypeName = "CHAR(4)")]
        public string? TicketTypeId { get; set; }

        [Column(TypeName = "DATETIME")]
        public DateTime? TicketCreatedDate { get; set; }

        public string? Status { get; set; }

        [Column(TypeName = "CHAR(4)")]
        public string? CreatedByEmpId { get; set; }

        [Column(TypeName = "CHAR(4)")]
        public string? AssignedToEmpId { get; set; }

        [ForeignKey("TicketTypeId")]
        public virtual TicketType? TicketType { get; set; }

        [ForeignKey("CreatedByEmpId")]
        public virtual Employee? CreatedByEmployee { get; set; }

        [ForeignKey("AssignedToEmpId")]
        public virtual Employee? AssignedToEmployee { get; set; }

        public virtual ICollection<TicketReply> TicketReplies { get; set; } = new List<TicketReply>();
    }
}
