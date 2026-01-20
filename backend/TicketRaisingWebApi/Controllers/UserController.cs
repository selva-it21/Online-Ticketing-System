// using Microsoft.AspNetCore.Http;
// using Microsoft.AspNetCore.Mvc;
// using UserLibrary.Models;
// using UserLibrary.Repos;

// namespace TicketRaisingWebApi.Controllers
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     public class UserController : ControllerBase
//     {
//         IUserRepository userRepo;
//         public UserController(IUserRepository userRepository) {
//             userRepo = userRepository;
//         }
//         [HttpPost]
//         [ProducesResponseType(201)]
//         [ProducesResponseType(400)]
//         public async Task<ActionResult> Register(LoginUser user) {
//             try {
//                 await userRepo.RegisterAsync(user);
//                 return Created($"api/user/{user.Username}", user);
//             }
//             catch(UserException ex) {
//                 return BadRequest(ex.Message);
//             }
//         }
//         [HttpGet("{username}/{password}")]
//         [ProducesResponseType(200)]
//         [ProducesResponseType(404)]
//         public async Task<ActionResult> Login(string username, string password) {
//             try {
//                 LoginUser user = await userRepo.LoginAsync(username, password);
//                 return Ok(user);
//             }
//             catch(UserException ex) {
//                 return NotFound(ex.Message);
//             }
//         }
//     }
// }
