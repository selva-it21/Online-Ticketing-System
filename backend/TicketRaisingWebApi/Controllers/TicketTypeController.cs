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
        ITicketTypesRepository ticketTypeRepo;

        public TicketTypeController(ITicketTypesRepository ticketTypeRepository)
        {
            ticketTypeRepo = ticketTypeRepository;
        }

        // GET: api/tickettype
        [HttpGet]
        [ProducesResponseType(200)]
        public async Task<ActionResult> GetAll()
        {
            List<TicketType> ticketTypes = await ticketTypeRepo.GetAllTicketTypesAsync();
            return Ok(ticketTypes);
        }

        // GET: api/tickettype/{ticketTypeId}
        [HttpGet("{ticketTypeId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> GetOne(string ticketTypeId)
        {
            try
            {
                TicketType ticketType = await ticketTypeRepo.GetTicketTypeAsync(ticketTypeId);
                return Ok(ticketType);
            }
            catch (TicketingException ex)
            {
                return NotFound(ex.Message);
            }
        }

        // POST: api/tickettype
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult> Add(TicketType ticketType)
        {
            try
            {
                await ticketTypeRepo.AddTicketTypeAsync(ticketType);
                return Created($"api/tickettype/{ticketType.TicketTypeId}", ticketType);
            }
            catch (TicketingException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/tickettype/{ticketTypeId}
        [HttpPut("{ticketTypeId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> Update(string ticketTypeId, TicketType ticketType)
        {
            try
            {
                await ticketTypeRepo.UpdateTicketTypeAsync(ticketTypeId, ticketType);
                return Ok(ticketType);
            }
            catch (TicketingException ex)
            {
                if (ex.Message.Contains("No such"))
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }

        // DELETE: api/tickettype/{ticketTypeId}
        [HttpDelete("{ticketTypeId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> Delete(string ticketTypeId)
        {
            try
            {
                await ticketTypeRepo.DeleteTicketTypeAsync(ticketTypeId);
                return Ok();
            }
            catch (TicketingException ex)
            {
                if (ex.Message.Contains("No such"))
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }
    }
}
