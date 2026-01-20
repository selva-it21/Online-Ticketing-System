using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TicketRaisingLibrary.Models
{
    [Table("Employee")]
    public class Employee 
    {
        [Key]
        [Column(TypeName = "CHAR(4)")]
        public string? EmpId { get; set; }

        [Column(TypeName = "VARCHAR(50)")]
        public string? EmpName { get; set; }

        [Column(TypeName = "VARCHAR(15)")]
        public string? Password { get; set; }

        [Column(TypeName = "VARCHAR(50)")]
        public string? Role { get; set; }

        [Column(TypeName = "CHAR(4)")]
        public string? DeptId { get; set; }

        [ForeignKey("DeptId")]
        public virtual Department? Department { get; set; }

        public virtual ICollection<Ticket> CreatedTickets { get; set; } = new List<Ticket>();
        public virtual ICollection<Ticket> AssignedTickets { get; set; } = new List<Ticket>();

        public virtual ICollection<TicketReply> CreatorReplies { get; set; } = new List<TicketReply>();
        public virtual ICollection<TicketReply> AssignedReplies { get; set; } = new List<TicketReply>();
    }
}
