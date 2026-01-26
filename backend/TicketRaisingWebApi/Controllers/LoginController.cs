using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TicketRaisingLibrary.Repos;

namespace TicketRaisingWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        IEmployeeRepository empRepo;
        public LoginController(IEmployeeRepository empRepository) {
            empRepo = empRepository;
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
