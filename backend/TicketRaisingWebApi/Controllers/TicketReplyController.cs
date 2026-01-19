using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TicketRaisingLibrary.Models;
using TicketRaisingLibrary.Repos;

namespace TicketRaisingWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketReplyController : ControllerBase
    {
        ITicketReplyRepository ticketReplyRepo;
        public TicketReplyController(ITicketReplyRepository ticketReplyRepository)
        {
            ticketReplyRepo = ticketReplyRepository;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await ticketReplyRepo.GetAllTicketRepliesAsync());
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
                return Ok(await ticketReplyRepo.GetTicketReplyByIdAsync(id));
            }
            catch (TicketingException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("ticket/{ticketId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetByTicketId(string ticketId)
        {
            try
            {
                return Ok(await ticketReplyRepo.GetRepliesByTicketIdAsync(ticketId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("creator/{empId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetByCreator(string empId)
        {
            try
            {
                return Ok(await ticketReplyRepo.GetRepliesByCreatorEmpIdAsync(empId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("assigned/{empId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetByAssigned(string empId)
        {
            try
            {
                return Ok(await ticketReplyRepo.GetRepliesByAssignedEmpIdAsync(empId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("employee/{empId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetByEmployee(string empId)
        {
            try
            {
                return Ok(await ticketReplyRepo.GetRepliesByEmployeeAsync(empId));
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
        public async Task<IActionResult> Create(TicketReply ticketReply)
        {
            try
            {
                await ticketReplyRepo.AddTicketReplyAsync(ticketReply);
                return Created($"api/TicketReply/{ticketReply.ReplyId}", ticketReply);
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
        [ProducesResponseType(500)]
        public async Task<IActionResult> Edit(string id, TicketReply ticketReply)
        {
            try
            {
                await ticketReplyRepo.UpdateTicketReplyAsync(id, ticketReply);
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
        [ProducesResponseType(500)]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                await ticketReplyRepo.DeleteTicketReplyAsync(id);
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
    }
}