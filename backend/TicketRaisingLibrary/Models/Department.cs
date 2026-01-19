using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TicketRaisingLibrary.Models
{
    [Table("Department")]
    public class Department
    {
        [Key]
        [Column(TypeName = "CHAR(4)")]
        public string? DeptId { get; set; }

        [Column(TypeName = "VARCHAR(50)")]
        public string? DeptName { get; set; }

        [Column(TypeName = "VARCHAR(100)")]
        public string? Description { get; set; }

        public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
        public virtual ICollection<TicketType> TicketTypes { get; set; } = new List<TicketType>();
    }
}
