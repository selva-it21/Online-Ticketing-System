using System;
using Microsoft.EntityFrameworkCore;

namespace UserLibrary.Models;

public class UserDBContext : DbContext
{
    public UserDBContext()
    {
        
    }
    public UserDBContext(DbContextOptions<UserDBContext> options) : base(options)
    {
        
    }
    public virtual DbSet<LoginUser> LoginUsers { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("data source=localhost\\SQLEXPRESS; database=UserDB; user id=sa; password=User%2025; Trust Server Certificate=true");
        // optionsBuilder.UseSqlServer(@"data source=host.docker.internal\SQLEXPRESS; database=UserDB; user id=sa; password=User%2025; Trust Server Certificate=true;");
    }
}
