using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketRaisingLibrary.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace TicketRaisingLibrary.Repos;

public class EFTicketReplyRepository : ITicketReplyRepository
{
    TicketPortalDBContext context = new TicketPortalDBContext();
    
    public async Task AddTicketReplyAsync(TicketReply ticketReply)
    {
        try
        {
            ticketReply.ReplyByAssignedEmpId = null;
            // if(ticketReply.ReplyByCreatorEmpId == "")
            //     ticketReply.ReplyByCreatorEmpId = null;
            // if(ticketReply.ReplyByAssignedEmpId == "")
            //     ticketReply.ReplyByAssignedEmpId = null;
            await context.TicketReplies.AddAsync(ticketReply);
            await context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            SqlException sqlException = ex.InnerException as SqlException;
            int errorNumber = sqlException.Number;

            switch (errorNumber){
                case 547: throw new TicketingException("Select Replier", 500);
                case 2627: throw new TicketingException("Reply ID already exists", 501);
                case 2628: throw new TicketingException("Reply message too long",502);
                default: throw new TicketingException(sqlException.Message, 599);
            }
        }
        catch(Exception ex){
            throw new TicketingException(ex.Message,555);
        }
    }

    public async Task UpdateTicketReplyAsync(string replyId, TicketReply ticketReply)
    {
        TicketReply reply2edit = await GetTicketReplyByIdAsync(replyId);
        try
        {
            reply2edit.ReplyMessage = ticketReply.ReplyMessage;
            reply2edit.ReplyByAssignedEmpId = ticketReply.ReplyByAssignedEmpId;
            reply2edit.ReplyByCreatorEmpId = ticketReply.ReplyByCreatorEmpId;
            await context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            SqlException sqlException = ex.InnerException as SqlException;
            int errorNumber = sqlException.Number;

            switch (errorNumber){
                case 2628: throw new TicketingException("Reply message too long",502);
                default: throw new TicketingException(sqlException.Message, 599);
            }
        }
        catch(Exception ex){
            throw new TicketingException(ex.Message,555);
        }
}

    public async Task DeleteTicketReplyAsync(string replyId)
    {
        TicketReply reply2del = await GetTicketReplyByIdAsync(replyId);
        try
        {
            context.TicketReplies.Remove(reply2del);
            await context.SaveChangesAsync();
        }
        catch
        {
            throw new TicketingException("No reply id found",666);
        }
    }

    public async Task<List<TicketReply>> GetAllTicketRepliesAsync()
    {
        List<TicketReply> replies = await context.TicketReplies.ToListAsync();
        return replies;
    }

    public async Task<TicketReply> GetTicketReplyByIdAsync(string replyId)
    {
        try
        {
            TicketReply reply = await (from r in context.TicketReplies where r.ReplyId == replyId select r).FirstAsync();
            return reply;
        }
        catch
        {
            throw new TicketingException("No such reply ID", 2005);
        }
    }

    public async Task<List<TicketReply>> GetRepliesByTicketIdAsync(string ticketId)
    {
        List<TicketReply> replies = await context.TicketReplies.Where(r => r.TicketId == ticketId).ToListAsync();
        return replies;
    }

    public async Task<List<TicketReply>> GetRepliesByCreatorEmpIdAsync(string empId)
    {
        List<TicketReply> replies = await context.TicketReplies
            .Where(r => r.ReplyByCreatorEmpId == empId)
            .ToListAsync();
        return replies;
    }

    public async Task<List<TicketReply>> GetRepliesByAssignedEmpIdAsync(string empId)
    {
        List<TicketReply> replies = await context.TicketReplies
            .Include(r => r.Ticket)
            .Where(r => r.Ticket.AssignedToEmpId == empId)
            .ToListAsync();
        return replies;
    }

    public async Task<List<TicketReply>> GetRepliesByEmployeeAsync(string empId)
    {
        List<TicketReply> replies = await context.TicketReplies
            .Include(r => r.Ticket)
            .Where(r => r.ReplyByAssignedEmpId == empId || r.Ticket.AssignedToEmpId == empId)
            .ToListAsync();
        return replies;
    }
}