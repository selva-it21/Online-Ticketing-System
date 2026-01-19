using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TicketRaisingLibrary.Models;
using TicketRaisingLibrary.Repos;

namespace TicketRaisingWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
        public class SLAController : ControllerBase
    {
        ISLARepository slaRepo;

        public SLAController(ISLARepository slaRepository)
        {
            slaRepo = slaRepository;
        }
        [HttpGet]
        [ProducesResponseType(200)]
        public async Task<ActionResult> GetAll()
        {
            List<SLA> slas = await slaRepo.GetAllSLAsAsync();
            return Ok(slas);
        }
        [HttpGet("{slaId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> GetOne(string slaId)
        {
            try{
                SLA sla = await slaRepo.GetSLAAsync(slaId);
                return Ok(sla);
            } catch (TicketingException ex) {
                return NotFound(ex.Message);
            }
        }
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult> Add(SLA sla)
        {
            try {
                await slaRepo.AddSLAAsync(sla);
                return Created($"api/sla/{sla.SLAId}", sla);
            } catch (TicketingException ex) {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("{slaId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> Update(string slaId, SLA sla)
        {
            try {
                await slaRepo.UpdateSLAAsync(slaId, sla);
                return Ok(sla);
            } catch (TicketingException ex) {
                if (ex.Message == "No such SLA Id")
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{slaId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> Delete(string slaId)
        {
            try {
                await slaRepo.DeleteSLAAsync(slaId);
                return Ok();
            } catch (TicketingException ex) {
                if (ex.Message == "No such SLA Id")
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }
    }
}