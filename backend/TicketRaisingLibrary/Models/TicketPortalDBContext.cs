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
    protected override void OnModelCreating(ModelBuilder modelBuilder)
{      
    // Ticket → Employee (Created By)
    modelBuilder.Entity<Ticket>()
        .HasOne(t => t.CreatedByEmployee)
        .WithMany(e => e.CreatedTickets)
        .HasForeignKey(t => t.CreatedByEmpId)
        .OnDelete(DeleteBehavior.Restrict);

    // Ticket → Employee (Assigned To)
    modelBuilder.Entity<Ticket>()
        .HasOne(t => t.AssignedToEmployee)
        .WithMany(e => e.AssignedTickets)
        .HasForeignKey(t => t.AssignedToEmpId)
        .OnDelete(DeleteBehavior.Restrict);

    // ✅ TicketReply → Employee (Creator)
    modelBuilder.Entity<TicketReply>()
        .HasOne(tr => tr.ReplyByCreator)
        .WithMany(e => e.CreatorReplies)
        .HasForeignKey(tr => tr.ReplyByCreatorEmpId)
        .OnDelete(DeleteBehavior.Restrict);

    // ✅ TicketReply → Employee (Assigned)
    modelBuilder.Entity<TicketReply>()
        .HasOne(tr => tr.ReplyByAssigned)
        .WithMany(e => e.AssignedReplies)
        .HasForeignKey(tr => tr.ReplyByAssignedEmpId)
        .OnDelete(DeleteBehavior.Restrict);

    // Ticket → TicketReply
    modelBuilder.Entity<TicketReply>()
        .HasOne(tr => tr.Ticket)
        .WithMany(t => t.TicketReplies)
        .HasForeignKey(tr => tr.TicketId);
}

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        
        // optionsBuilder.UseSqlServer(@"data source=host.docker.internal\SQLEXPRESS; database=TicketPortalDB; user id=sa; password=User%2025; Trust Server Certificate=true");
        optionsBuilder.UseSqlServer(@"data source=localhost\SQLEXPRESS; database=TicketPortalDB; user id=sa; password=User%2025; Trust Server Certificate=true");
    }
}
