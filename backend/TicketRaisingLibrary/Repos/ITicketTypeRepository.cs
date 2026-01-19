using System;
using TicketRaisingLibrary.Models;
namespace TicketRaisingLibrary.Repos;

public interface ITicketTypesRepository
{
    Task AddTicketTypeAsync(TicketType ticketType);

    Task<TicketType> GetTicketTypeByIdAsync(string ticketTypeId);

    Task<List<TicketType>> GetAllTicketTypesAsync();

    Task UpdateTicketTypeAsync(string ticketTypeId,TicketType ticketType);

    Task DeleteTicketTypeAsync(string ticketTypeId);

    Task<List<TicketType>> GetTicketTypesBySLAsync(string SLAId);

    Task<List<TicketType>> GetTicketTypesByDeptAsync(string departmentId);

}
