using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TicketRaisingLibrary.Models;
using TicketRaisingLibrary.Repos;

namespace TicketRaisingWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeController : ControllerBase
    {
        
        
        IEmployeeRepository empRepo;
        public EmployeeController(IEmployeeRepository empRepository) {
            empRepo = empRepository;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await empRepo.GetAllEmployeesAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetOne(string id)
        {
            try
            {
                return Ok(await empRepo.GetEmployeeByIdAsync(id));
            }
            catch (TicketingException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("department/{deptId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetByDepartment(string deptId)
        {
            try
            {
                return Ok(await empRepo.GetEmployeesByDepartmentAsync(deptId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Create(Employee employee)
        {
            try
            {
                await empRepo.AddEmployeeAsync(employee);
                return Created($"api/Employee/{employee.EmpId}", employee);
            }
            catch (TicketingException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Edit(string id, Employee employee)
        {
            try
            {
                await empRepo.UpdateEmployeeAsync(id, employee);
                return Ok();
            }
            catch (TicketingException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                await empRepo.DeleteEmployeeAsync(id);
                return Ok();
            }
            catch (TicketingException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{EmpId}/{Password}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Login(string EmpId, string Password)
        {
            try
            {
                return Ok(await empRepo.LoginAsync(EmpId, Password));
            }
            catch (TicketingException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}