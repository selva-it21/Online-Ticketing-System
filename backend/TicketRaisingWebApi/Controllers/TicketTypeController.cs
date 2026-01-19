using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TicketRaisingLibrary.Models;
using TicketRaisingLibrary.Repos;

namespace TicketRaisingWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TicketTypeController : ControllerBase
    {
        ITicketTypeRepository ticketTypeRepository;

        public TicketTypeController(ITicketTypeRepository ticketTypeRepository)
        {
            this.ticketTypeRepository = ticketTypeRepository;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await ticketTypeRepository.GetAllTicketTypesAsync());
        }


        [HttpGet("{ticketTypeId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetOne(string ticketTypeId)
        {
            try
            {
                return Ok(await ticketTypeRepository.GetTicketTypeByIdAsync(ticketTypeId));
            }
            catch (TicketingException ex)
            {
                return NotFound(ex.Message);
            }
        }


        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Create(TicketType ticketType)
        {
            try
            {
                await ticketTypeRepository.AddTicketTypeAsync(ticketType);
                return Created($"api/TicketType/{ticketType.TicketTypeId}", ticketType);
            }
            catch (TicketingException ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("{ticketTypeId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Edit(string ticketTypeId, TicketType ticketType)
        {
            try
            {
                await ticketTypeRepository.UpdateTicketTypeAsync(ticketTypeId, ticketType);
                return Ok(ticketType);
            }
            catch (TicketingException ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("{ticketTypeId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Delete(string ticketTypeId)
        {
            try
            {
                await ticketTypeRepository.DeleteTicketTypeAsync(ticketTypeId);
                return Ok();
            }
            catch (TicketingException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}