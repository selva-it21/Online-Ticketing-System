using System;
using TicketRaisingLibrary.Models;
using Microsoft.EntityFrameworkCore;

namespace TicketRaisingLibrary.Repos;

// Custom TicketingException class
public class TicketingException : Exception
{
    public int ErrorNumber { get; }

    public TicketingException(string message, int errorNumber) : base(message)
    {
        ErrorNumber = errorNumber;
    }
}

public class EFTicketRepliesRepository : ITicketRepliesRepository
{
    TicketContext context = new TicketContext();
    
    public async Task AddAsync(TicketReply reply)
    {
        try
        {
            await context.TicketReplies.AddAsync(reply);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new TicketingException("Error adding ticket reply: " + ex.Message, 1001);
        }
    }

    public async Task DeleteAsync(int replyId)
    {
        try
        {
            TicketReply reply = await GetByIdAsync(replyId);
            context.TicketReplies.Remove(reply);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new TicketingException("Ticket reply can't delete because of this error: " + ex.Message, 1002);
        }
    }

    public async Task<List<TicketReply>> GetAllAsync()
    {
        try
        {
            List<TicketReply> replies = await context.TicketReplies.ToListAsync();
            return replies;
        }
        catch (Exception ex)
        {
            throw new TicketingException("Error retrieving all ticket replies: " + ex.Message, 1003);
        }
    }

    public async Task<TicketReply> GetByIdAsync(int replyId)
    {
        try
        {
            TicketReply reply = await (from r in context.TicketReplies 
                                     where r.ReplyId == replyId 
                                     select r).FirstAsync();
            return reply;
        }
        catch
        {
            throw new TicketingException("No Ticket Reply found with ID: " + replyId, 1004);
        }
    }

    public async Task<List<TicketReply>> GetByTicketIdAsync(int ticketId)
    {
        try
        {
            List<TicketReply> replies = await context.TicketReplies
                .Where(r => r.TicketId == ticketId)
                .ToListAsync();
            return replies;
        }
        catch (Exception ex)
        {
            throw new TicketingException("Error retrieving replies by ticket ID: " + ex.Message, 1005);
        }
    }

    public async Task UpdateAsync(int replyId, TicketReply reply)
    {
        try
        {
            TicketReply existingReply = await GetByIdAsync(replyId);
            existingReply.ReplyText = reply.ReplyText;
            existingReply.ReplyDate = reply.ReplyDate;
            existingReply.RepliedBy = reply.RepliedBy;
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new TicketingException("Can't update because of this error: " + ex.Message, 1006);
        }
    }
}