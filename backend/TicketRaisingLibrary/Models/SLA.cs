using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TicketRaisingLibrary.Models
{
    [Table("SLA")]
    public class SLA
    {
        [Key]
        [Column(TypeName = "CHAR(4)")]
        public string? SLAId { get; set; }

        [Column(TypeName = "VARCHAR(50)")]
        public string? SLAName { get; set; }

        [Column(TypeName = "VARCHAR(20)")]
        public string? Priority { get; set; }

        public int ResponseTime { get; set; }
        public int ResolutionHours { get; set; }

        public virtual ICollection<TicketType> TicketTypes { get; set; } = new List<TicketType>();
    }
}
