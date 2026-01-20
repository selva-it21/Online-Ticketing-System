using System;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using TicketRaisingLibrary.Models;

namespace TicketRaisingLibrary.Repos;

public class EFDepartmentRepository : IDepartmentRepository
{
    TicketPortalDBContext context = new TicketPortalDBContext();
    public async Task AddDepartmentAsync(Department department)
    {
        try
        {
            await context.AddAsync(department);
            await context.SaveChangesAsync();

        }
        catch (DbUpdateException ex) {
            SqlException sqlException = ex.InnerException as SqlException;
            int errorNumber = sqlException.Number;
            switch(errorNumber) {
                case 2627: throw new TicketingException("Department ID already exists",501);
                //case 2628: throw new ProductException("Name and/or description too long");
                default: throw new TicketingException(sqlException.Message,599);
            }    
        }
        catch(Exception ex)
        {
            throw new TicketingException(ex.Message,555);
        }
    }

    public async Task DeleteDepartmentAsync(string deptId)
    {
        Department? deptToDelete = await context.Departments
            .Include(d => d.Employees)
            .Include(d => d.TicketTypes)
            .FirstOrDefaultAsync(d => d.DeptId == deptId);

        if (deptToDelete == null)
        {
            throw new TicketingException("Department not found",3008);
        }

        if (deptToDelete.Employees.Count == 0 &&
            deptToDelete.TicketTypes.Count == 0)
        {
            context.Departments.Remove(deptToDelete);
            await context.SaveChangesAsync();
        }
        else
        {
            throw new TicketingException(
                "Cannot delete Department because it contains Employees or Ticket Types", 3009
            );
        }
    }


    public async Task<List<Department>> GetAllDepartmentAsync()
    {
        List<Department> departments = await context.Departments.ToListAsync();
        return departments;
      
    }

    public async Task<Department> GetDepartmentAsync(string deptId)
    {
        try
        {
            Department department = await (from d in context.Departments where d.DeptId == deptId select d).FirstAsync();
            return department;
        }
        catch
        {
            throw new TicketingException("No Department Id Found", 3004);
        }
    }


    public async Task UpdateDepartmentAsync(Department department, string deptId)
    {
        Department dept1 = await GetDepartmentAsync(deptId);
        try
        {
            dept1.DeptName = department.DeptName;
            dept1.Description = department.Description;
            await context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            SqlException sqlException = ex.InnerException as SqlException;
            int errorNumber = sqlException.Number;
            switch (errorNumber)
            {
                case 547: throw new TicketingException("Cannot update due to foreign key constraint", 1002); break;
                default: throw new TicketingException(sqlException.Message, 1099);
            }
        }
    }

}
