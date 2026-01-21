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
    public class TicketController : ControllerBase
    {
        ITicketRepository ticketRepo;
        public TicketController(ITicketRepository ticketRepository)
        {
            ticketRepo = ticketRepository;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await ticketRepo.GetAllTicketsAsync());
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
                return Ok(await ticketRepo.GetTicketByIdAsync(id));
            }
            catch (TicketingException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("type/{ticketTypeId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetByType(string ticketTypeId)
        {
            try
            {
                return Ok(await ticketRepo.GetTicketsByTypeAsync(ticketTypeId));
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
                return Ok(await ticketRepo.GetTicketsByCreatorAsync(empId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("assigned/{empId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetAssignedTo(string empId)
        {
            try
            {
                return Ok(await ticketRepo.GetTicketsAssignedToAsync(empId));
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
        public async Task<IActionResult> Create(Ticket ticket)
        {
            try
            {
                // ticket.AssignedToEmpId = null;
                Ticket createdTicket = await ticketRepo.AddTicketAsync(ticket);
                return Created($"api/Ticket/{createdTicket.TicketId}", createdTicket);
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
        public async Task<IActionResult> Edit(string id, Ticket ticket)
        {
            try
            {
                await ticketRepo.UpdateTicketAsync(id, ticket);
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
                await ticketRepo.DeleteTicketAsync(id);
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