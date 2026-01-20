using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TicketRaisingLibrary.Models;
using TicketRaisingLibrary.Repos;
 
namespace TicketRaisingWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
 
    public class SLAController : ControllerBase
    {
        ISLARepository slaRepository;
 
        public SLAController(ISLARepository slaRepository)
        {
            this.slaRepository = slaRepository;
        }
 
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await slaRepository.GetAllSLAsAsync());
        }
 
        [HttpGet("{slaId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetOne(string slaId)
        {
            try
            {
                return Ok(await slaRepository.GetSLAAsync(slaId));
            }
            catch (TicketingException ex)
            {
                return NotFound(ex.Message);
            }
        }
 
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Create(SLA sla)
        {
            try
            {
                await slaRepository.AddSLAAsync(sla);
                return Created($"api/SLA/{sla.SLAId}", sla);
            }
            catch (TicketingException ex)
            {
                return BadRequest(ex.Message);
            }
        }
 
        [HttpPut("{slaId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Edit(string slaId, SLA sla)
        {
            try
            {
                await slaRepository.UpdateSLAAsync(slaId, sla);
                return Ok(sla);
            }
            catch (TicketingException ex)
            {
                return BadRequest(ex.Message);
            }
        }
 
        [HttpDelete("{slaId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Delete(string slaId)
        {
            try
            {
                await slaRepository.DeleteSLAAsync(slaId);
                return Ok();
            }
            catch (TicketingException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
 
 
