using System;
using Microsoft.EntityFrameworkCore;

namespace TicketRaisingLibrary.Models;

public class TicketPortalDBContext : DbContext
{
        public TicketPortalDBContext()
    {
           
    }
    public TicketPortalDBContext(DbContextOptions<TicketPortalDBContext> options) : base(options)
    {
       
    }
    public virtual DbSet<Department> Departments {get; set;}
    public virtual DbSet<Employee> Employees {get; set;}
    public virtual DbSet<SLA> SLAs {get; set;}
    public virtual DbSet<TicketReply> TicketReplies {get; set;}
    public virtual DbSet<Ticket> Tickets {get; set;}
    public virtual DbSet<TicketType> TicketTypes {get; set;}
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        
        // optionsBuilder.UseSqlServer(@"data source=host.docker.internal\SQLEXPRESS; database=TicketPortalDB; user id=sa; password=User%2025; Trust Server Certificate=true");
        optionsBuilder.UseSqlServer(@"data source=localhost\SQLEXPRESS; database=TicketPortalDB; user id=sa; password=User%2025; Trust Server Certificate=true");
    }
}
