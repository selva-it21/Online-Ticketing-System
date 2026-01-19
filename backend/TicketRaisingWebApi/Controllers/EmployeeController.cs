using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TicketRaisingLibrary.Models;
using TicketRaisingLibrary.Repos;

namespace TicketRaisingWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        
        
        IEmployeeRepository empRepo;
        public EmployeeController(IEmployeeRepository empRepository) {
            empRepo = empRepository;
        }
        [HttpGet("{EmpName}/{Password}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> Login(string EmpName, string Password) {
            try {
                Employee user = await empRepo.LoginAsync(EmpName, Password);
                return Ok(user);
            }
            catch(TicketingException ex) {
                return NotFound(ex.Message);
            }
        }
    }
}
