using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TicketRaisingLibrary.Models;

namespace TicketRaisingLibrary.Repos;

public interface ITicketRepository
{
    Task<Ticket> AddTicketAsync(Ticket ticket);
    Task UpdateTicketAsync(string ticketId, Ticket ticket);
    Task DeleteTicketAsync(string ticketId);
    Task<Ticket> GetTicketByIdAsync(string ticketId);
    Task<List<Ticket>> GetAllTicketsAsync();
    Task<List<Ticket>> GetTicketsByTypeAsync(string ticketTypeId);
    Task<List<Ticket>> GetTicketsByCreatorAsync(string empId);
    Task<List<Ticket>> GetTicketsAssignedToAsync(string empId);
}