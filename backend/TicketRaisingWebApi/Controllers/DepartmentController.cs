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
    public class DepartmentController : ControllerBase{
        IDepartmentRepository departmentRepository;
 
        public DepartmentController(IDepartmentRepository departmentRepository)
        {
            this.departmentRepository = departmentRepository;
        }
 
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            
            return Ok(await departmentRepository.GetAllDepartmentAsync());
        }
 
        [HttpGet("{DeptId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetOne(string DeptId)
        {
            try
            {
                return Ok(await departmentRepository.GetDepartmentAsync(DeptId));
            }
            catch (TicketingException ex)
            {
                return NotFound(ex.Message);
            }
        }
 
        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Create(Department department)
        {
            try
            {
                System.Console.WriteLine(department);
                await departmentRepository.AddDepartmentAsync(department);
                return Created($"api/Department/{department.DeptId}", department);
            }
            catch (TicketingException ex)
            {
                return BadRequest(ex.Message);
            }
        }
 
        [HttpPut("{DeptId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Edit(string DeptId, Department department)
        {
            try
            {
                await departmentRepository.UpdateDepartmentAsync(department, DeptId);
                return Ok(department);
            }
            catch (TicketingException ex)
            {
                return BadRequest(ex.Message);
            }
        }
 
        [HttpDelete("{DeptId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Delete(string DeptId)
        {
            try
            {
                await departmentRepository.DeleteDepartmentAsync(DeptId);
                return Ok();
            }
            catch (TicketingException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}