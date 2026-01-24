using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketRaisingLibrary.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace TicketRaisingLibrary.Repos;

public class EFTicketRepository : ITicketRepository
{
    TicketPortalDBContext context = new TicketPortalDBContext();
    
    public async Task<Ticket> AddTicketAsync(Ticket ticket)
    {
        try
        {
            ticket.AssignedToEmpId = null;
            await context.Tickets.AddAsync(ticket);
            await context.SaveChangesAsync();
            return ticket;
        }
        catch (DbUpdateException ex)
        {
            SqlException sqlException = ex.InnerException as SqlException;
            int errorNumber = sqlException.Number;

            switch (errorNumber){
                case 547: throw new TicketingException("Please select Ticket type and then employee field", 500);
                case 2627: throw new TicketingException("Ticket ID already exists", 501);
                case 2628: throw new TicketingException("Description too long",502);
                default: throw new TicketingException(sqlException.Message, 599);
            }
        }
        catch(Exception ex)
        {
            throw new TicketingException(ex.Message,599);
        }
    }

    public async Task UpdateTicketAsync(string ticketId, Ticket ticket)
    {
        Ticket ticket2edit = await GetTicketByIdAsync(ticketId);
        try
        {
            ticket2edit.Title = ticket.Title;
            ticket2edit.Description = ticket.Description;
            ticket2edit.TicketTypeId = ticket.TicketTypeId;
            ticket2edit.Status = ticket.Status;
            ticket2edit.AssignedToEmpId = ticket.AssignedToEmpId;
            await context.SaveChangesAsync();
        }
        catch (DbUpdateException ex){
            SqlException sqlException = ex.InnerException as SqlException;
            int errorNumber = sqlException.Number;

            switch (errorNumber){
                case 2628: throw new TicketingException("Description too long",502);
                default: throw new TicketingException(sqlException.Message, 599);
            }
        }
        catch(Exception ex){
            throw new TicketingException(ex.Message,555);
        }
    }

    public async Task DeleteTicketAsync(string ticketId)
    {
        Ticket ticket2del = await context.Tickets.Include(t => t.TicketReplies).FirstOrDefaultAsync(t => t.TicketId == ticketId);

        if (ticket2del == null)
        {
            throw new TicketingException("No such ticket ID", 1003);
        }

        if (ticket2del.Status == "Closed")
        {
            context.Tickets.Remove(ticket2del);
            await context.SaveChangesAsync();
        }
        else
        {
            throw new TicketingException("Cannot delete because ticket is not closed", 1004);
        }
    }

    public async Task<Ticket> GetTicketByIdAsync(string ticketId)
    {
        try
        {
            Ticket ticket = await (from t in context.Tickets where t.TicketId == ticketId select t).FirstAsync();
            return ticket;
        }
        catch
        {
            throw new TicketingException("Select ticket type", 1005);
        }
    }

    public async Task<List<Ticket>> GetAllTicketsAsync()
    {
        List<Ticket> tickets = await context.Tickets.ToListAsync();
        return tickets;
    }

    public async Task<List<Ticket>> GetTicketsByTypeAsync(string ticketTypeId)
    {
        List<Ticket> tickets = await context.Tickets.Where(t => t.TicketTypeId == ticketTypeId).ToListAsync();
        return tickets;
    }

    public async Task<List<Ticket>> GetTicketsByCreatorAsync(string empId)
    {
        List<Ticket> tickets = await context.Tickets.Where(t => t.CreatedByEmpId == empId).ToListAsync();
        return tickets;
    }

    public async Task<List<Ticket>> GetTicketsAssignedToAsync(string empId)
    {
        try
        {
            List<Ticket> tickets = await context.Tickets.Where(t => t.AssignedToEmpId == empId).ToListAsync();
            return tickets;
        }
        catch{
            throw new TicketingException("Select Assigned Employee ID",577);
        }
    }
}