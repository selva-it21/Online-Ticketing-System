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
        catch (DbUpdateException ex)
        {
            SqlException sqlException = ex.InnerException as SqlException;
            if (sqlException != null && sqlException.Number == 2627)
                throw new TicketingException("Department ID already exists", 3000);
            else
                throw new TicketingException(sqlException?.Message ?? "Database Error", 3000);
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
            throw new Exception("Department not found");
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
                "Cannot delete Department because it contains Employees or Ticket Types", 3001
            );
        }
    }


    public async Task<List<Department>> GetAllDepartmentAsync()
    {
        try
        {
            List<Department> departments = await context.Departments.ToListAsync();
            return departments;
        }
        catch (Exception ex)
        {

            throw new TicketingException(ex.Message, 3002);
        }
    }

    public async Task<Department> GetDepartmentAsync(string deptId)
    {
        try
        {
            Department department =
                await (from d in context.Departments
                       where d.DeptId == deptId
                       select d).FirstAsync();

            return department;
        }
        catch
        {
            throw new TicketingException("No Department Id Found", 3000);
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
        catch (Exception ex)
        {
            throw new TicketingException(ex.Message, 3003);
        }
    }

}
