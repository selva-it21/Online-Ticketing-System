using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TicketRaisingLibrary.Models
{
    [Table("TicketTypes")]
    public class TicketType
    { 
        [Key]
        [Column(TypeName = "CHAR(4)")]
        public string? TicketTypeId { get; set; }

        [Column(TypeName = "VARCHAR(30)")]
        public string? TypeName { get; set; }

        [Column(TypeName = "VARCHAR(50)")]
        public string? Description { get; set; }

        [Column(TypeName = "CHAR(4)")]
        public string? SLAId { get; set; }

        [Column(TypeName = "CHAR(4)")]
        public string? DeptId { get; set; }

        [ForeignKey("SLAId")]
        public virtual SLA? SLA { get; set; }

        [ForeignKey("DeptId")]
        public virtual Department? Department { get; set; }
       
        public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
    }
}
