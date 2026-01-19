using System;
using TicketRaisingLibrary.Models;

namespace TicketRaisingLibrary.Repos;

public interface IEmployeeRepository
{
        Task AddEmployeeAsync(Employee employee);

        Task UpdateEmployeeAsync(string empId, Employee employee);

        Task DeleteEmployeeAsync(string empId);

        Task<Employee> GetEmployeeByIdAsync(string empId);

        Task<List<Employee>> GetAllEmployeesAsync();

        Task<List<Employee>> GetEmployeesByDepartmentAsync(string deptId);

        Task<Employee> LoginAsync(string username, string password);
}
