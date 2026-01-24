using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using TicketRaisingLibrary.Models;
using TicketRaisingLibrary.Repos;
    public class EFSLARepository : ISLARepository
    {
        TicketPortalDBContext  context = new TicketPortalDBContext ();
        public async Task<List<SLA>> GetAllSLAsAsync()
        {
            return await context.SLAs.ToListAsync();
        }
        public async Task<SLA> GetSLAAsync(string slaId)
        {
            try{
                SLA sla = await context.SLAs.FirstAsync(s => s.SLAId == slaId);
                return sla;
            }
            catch{
                throw new TicketingException("No such SLA Id",3003);
            }
        }
        public async Task AddSLAAsync(SLA sla)
        {
            try{
                await context.SLAs.AddAsync(sla);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                SqlException sqlException = ex.InnerException as SqlException;
                int errorNumber = sqlException.Number;

                switch (errorNumber){
                    case 2627: throw new TicketingException("SLA ID already exists", 501);
                    case 2628: throw new TicketingException("Name or Priority too long",502);
                    default: throw new TicketingException(sqlException.Message, 599);
                }
            }
            catch(Exception ex){
                throw new TicketingException(ex.Message,555);
            }           
        }
        public async Task UpdateSLAAsync(string slaId, SLA sla)
        {
            SLA sla2edit = await GetSLAAsync(slaId);
 
            try {
                sla2edit.SLAName = sla.SLAName;
                sla2edit.Priority = sla.Priority;
                sla2edit.ResponseTime = sla.ResponseTime;
                sla2edit.ResolutionHours = sla.ResolutionHours;
 
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                SqlException sqlException = ex.InnerException as SqlException;
                int errorNumber = sqlException.Number;

                switch (errorNumber)
                {
                    case 2628: throw new TicketingException("Name or Priority too long",502);
                    default: throw new TicketingException(sqlException.Message, 599);
                }
            }
            catch(Exception ex){
                throw new TicketingException(ex.Message,555);
            }
        }
        public async Task DeleteSLAAsync(string slaId)
        {
            SLA sla2del = await context.SLAs.Include(s => s.TicketTypes).FirstOrDefaultAsync(s => s.SLAId == slaId);
 
            if (sla2del == null)
                throw new TicketingException("No such SLA Id",3003);
 
            if (sla2del.TicketTypes.Count == 0) {
                context.SLAs.Remove(sla2del);
                await context.SaveChangesAsync();
            }
            else{
                throw new TicketingException("Cannot delete SLA as it is linked to Ticket Types",3008);
            }
        }
    }