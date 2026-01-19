using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TicketRaisingLibrary.Models;
using TicketRaisingLibrary.Repos;
 
namespace TicketRaisingWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketTypeController : ControllerBase
    {
        ITicketTypeRepository ticketTypeRepo;
 
        public TicketTypeController(ITicketTypeRepository ticketTypeRepository)
        {
            ticketTypeRepo = ticketTypeRepository;
        }
 
   
        [HttpGet]
        [ProducesResponseType(200)]
        public async Task<ActionResult> GetAll()
        {
            List<TicketType> ticketTypes = await ticketTypeRepo.GetAllTicketTypesAsync();
            return Ok(ticketTypes);
        }
        [HttpGet("{ticketTypeId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> GetOne(string ticketTypeId)
        {
            try
            {
                TicketType ticketType = await ticketTypeRepo.GetTicketTypeByIdAsync(ticketTypeId);
                return Ok(ticketType);
            }
            catch (TicketingException ex)
            {
                return NotFound(ex.Message);
            }
        }
 
        
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
        [HttpGet("bySLA/{slaId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> GetBySLAId(string slaId)
        {
            try
            {
                List<TicketType> ticketTypes = await ticketTypeRepo.GetTicketTypesBySLAsync(slaId);
               
                if (ticketTypes == null || ticketTypes.Count == 0)
                {
                    return NotFound($"No purchase orders found for supplier: {slaId}");
                }
               
                return Ok(ticketTypes);
            }
            catch (TicketingException ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpGet("byDepartment/{DeptId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> GetByDepartmentId(string DeptId)
        {
            try
            {
                List<TicketType> ticketTypes = await ticketTypeRepo.GetTicketTypesByDeptAsync(DeptId);
               
                if (ticketTypes == null || ticketTypes.Count == 0)
                {
                    return NotFound($"No purchase orders found for supplier: {DeptId}");
                }
               
                return Ok(ticketTypes);
            }
            catch (TicketingException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
 
 