using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using TicketRaisingLibrary.Models;

namespace TicketRaisingLibrary.Repos
{
    public class EFEmployeeRepository : IEmployeeRepository
    {
        TicketPortalDBContext context = new();

        public async Task AddEmployeeAsync(Employee employee)
        {
            try
            {
                await context.Employees.AddAsync(employee);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                SqlException sqlException = ex.InnerException as SqlException;
                int errorNumber = sqlException.Number;

                switch (errorNumber)
                {
                    case 2627:
                        throw new TicketingException("Employee ID already exists", 501);

                    default:
                        throw new TicketingException(sqlException.Message, 599);
                }
            }
        }

        public async Task UpdateEmployeeAsync(string empId, Employee employee)
        {
            try
            {
                Employee empToEdit = await GetEmployeeByIdAsync(empId);

                empToEdit.EmpName = employee.EmpName;
                empToEdit.Password = employee.Password;
                empToEdit.Role = employee.Role;
                empToEdit.DeptId = employee.DeptId;

                await context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                SqlException sqlException = ex.InnerException as SqlException;
                int errorNumber = sqlException.Number;

                switch (errorNumber)
                {
                    default:
                        throw new TicketingException(sqlException.Message, 599);
                }
            }
        }

        public async Task DeleteEmployeeAsync(string empId)
        {
            Employee empToDelete = await context.Employees
                .Include(e => e.CreatedTickets)
                .Include(e => e.AssignedTickets)
                .Include(e => e.CreatorReplies)
                .Include(e => e.AssignedReplies)
                .FirstOrDefaultAsync(e => e.EmpId == empId);

            if (empToDelete == null)
                throw new TicketingException("Employee not found", 3003);

            if (empToDelete.CreatedTickets.Count > 0 ||
                empToDelete.AssignedTickets.Count > 0 ||
                empToDelete.CreatorReplies.Count > 0 ||
                empToDelete.AssignedReplies.Count > 0)
            {
                throw new TicketingException(
                    "Cannot delete employee because related records exist", 3009);
            }

            try
            {
                context.Employees.Remove(empToDelete);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                SqlException sqlException = ex.InnerException as SqlException;
                int errorNumber = sqlException.Number;

                switch (errorNumber)
                {
                    default:
                        throw new TicketingException(sqlException.Message, 599);
                }
            }
        }

        public async Task<Employee> GetEmployeeByIdAsync(string empId)
        {
            Employee employee = await context.Employees.FirstOrDefaultAsync(e => e.EmpId == empId);

            if (employee == null)
            {
                throw new TicketingException("Employee not found.", 3003);
            }

            return employee;
        }

        public async Task<List<Employee>> GetAllEmployeesAsync()
        {
            List<Employee> employees = await context.Employees.ToListAsync();
            return employees;
        }

        public async Task<List<Employee>> GetEmployeesByDepartmentAsync(string deptId)
        {
            List<Employee> employees = await context.Employees.Where(e => e.DeptId == deptId).ToListAsync();
            return employees;
        }
    }
}

