using System.Collections.Generic;
using System.Threading.Tasks;
using TicketRaisingLibrary.Models;

namespace TicketRaisingLibrary.Repos
{
    public interface ITicketReplyRepository
    {
        Task AddTicketReplyAsync(TicketReply ticketReply);
        Task UpdateTicketReplyAsync(string replyId, TicketReply ticketReply);
        Task DeleteTicketReplyAsync(string replyId);
        Task<List<TicketReply>> GetAllTicketRepliesAsync();
        Task<TicketReply> GetTicketReplyByIdAsync(string replyId);
        Task<List<TicketReply>> GetRepliesByTicketIdAsync(string ticketId);
        Task<List<TicketReply>> GetRepliesByCreatorEmpIdAsync(string empId);
        Task<List<TicketReply>> GetRepliesByAssignedEmpIdAsync(string empId);
        Task<List<TicketReply>> GetRepliesByEmployeeAsync(string empId);
    }
}