using TicketRaisingLibrary.Models;
 
namespace TicketRaisingLibrary.Repos
{
    public interface ISLARepository
    {
        Task<List<SLA>> GetAllSLAsAsync();
        Task<SLA> GetSLAAsync(string slaId);
        Task AddSLAAsync(SLA sla);
        Task UpdateSLAAsync(string slaId, SLA sla);
        Task DeleteSLAAsync(string slaId);
    }
}