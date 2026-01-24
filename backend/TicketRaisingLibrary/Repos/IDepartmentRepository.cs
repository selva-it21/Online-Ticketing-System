using System;
using TicketRaisingLibrary.Models;

namespace TicketRaisingLibrary.Repos;

public interface IDepartmentRepository
{

        Task AddDepartmentAsync(Department department);
        Task UpdateDepartmentAsync(Department department , string DeptId);
        Task DeleteDepartmentAsync(string DeptId);
        Task<List<Department>> GetAllDepartmentAsync();
        Task<Department> GetDepartmentAsync(string DeptId);
}
