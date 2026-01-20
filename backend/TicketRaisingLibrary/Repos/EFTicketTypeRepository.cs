using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using TicketRaisingLibrary.Models;
using TicketRaisingLibrary.Repos;

namespace TicketRaisingLibrary.Repos
{
    public class EFTicketTypeRepository : ITicketTypeRepository
    {
        TicketPortalDBContext context = new TicketPortalDBContext();
        public async Task AddTicketTypeAsync(TicketType ticketType)
        {
            try
            {
                await context.TicketTypes.AddAsync(ticketType);
                await context.SaveChangesAsync();
            }
<<<<<<< HEAD
            catch (DbUpdateException ex) {
                SqlException sqlException = ex.InnerException as SqlException;
                int errorNumber = sqlException.Number;
                switch(errorNumber) {
                    case 2627: throw new TicketingException("Ticket Type ID already exists",501);
                    default: throw new TicketingException(sqlException.Message,599);
                }
            }
            catch(Exception ex){
                throw new TicketingException(ex.Message,555);
=======
            catch (DbUpdateException ex)
            {
                SqlException sqlException = ex.InnerException as SqlException;
                int errorNumber = sqlException.Number;
                switch (errorNumber)
                {

                    case 2627: throw new TicketingException("Ticket Type ID already exists", 501);
                    default: throw new TicketingException(sqlException.Message, 599);
                }
>>>>>>> e12ad82701c571233829a19528c1b237e50c6c9d
            }
        }

        public async Task<List<TicketType>> GetAllTicketTypesAsync()
        {
<<<<<<< HEAD
            
            List<TicketType> ticketTypes = await context.TicketTypes.ToListAsync();
            return ticketTypes;
=======

            List<TicketType> ticketTypes = await context.TicketTypes.ToListAsync();
            return ticketTypes;

>>>>>>> e12ad82701c571233829a19528c1b237e50c6c9d
        }

        public async Task<TicketType> GetTicketTypeByIdAsync(string ticketTypeId)
        {
            TicketType ticketType = await context.TicketTypes.FirstOrDefaultAsync(tt => tt.TicketTypeId == ticketTypeId);

            if (ticketType == null)
            {
                throw new TicketingException("TicketType not found.", 3003);
            }

            return ticketType;
        }

        public async Task<List<TicketType>> GetTicketTypesBySLAsync(string SLAId)
        {
            List<TicketType> ticketTypes = await context.TicketTypes
                .Where(tt => tt.SLAId == SLAId)
                .ToListAsync();
            return ticketTypes;
        }

        public async Task<List<TicketType>> GetTicketTypesByDeptAsync(string departmentId)
        {
            List<TicketType> ticketTypes = await context.TicketTypes
<<<<<<< HEAD
                .Where(tt => tt.DeptId == departmentId)
                .ToListAsync();
            return ticketTypes;
            
=======
                   .Where(tt => tt.DeptId == departmentId)
                   .ToListAsync();

            return ticketTypes;

>>>>>>> e12ad82701c571233829a19528c1b237e50c6c9d
        }

        public async Task UpdateTicketTypeAsync(string ticketTypeId, TicketType ticketType)
        {
            try
            {
                TicketType ticketTypeToModify = await GetTicketTypeByIdAsync(ticketTypeId);

                ticketTypeToModify.TypeName = ticketType.TypeName;
                ticketTypeToModify.Description = ticketType.Description;
                ticketTypeToModify.SLAId = ticketType.SLAId;
                ticketTypeToModify.DeptId = ticketType.DeptId;

                await context.SaveChangesAsync();
            }
<<<<<<< HEAD
            catch (DbUpdateException ex) {
                SqlException sqlException = ex.InnerException as SqlException;
                int errorNumber = sqlException.Number;
                switch(errorNumber) {
                    case 2627: throw new TicketingException("Ticket Type ID already exists",501);
                    case 2628: throw new TicketingException("Description too long",502);
                    default: throw new TicketingException(sqlException.Message,599);
                }
            }
            catch(Exception ex){
                throw new TicketingException(ex.Message,555);
=======
            catch (DbUpdateException ex)
            {
                SqlException sqlException = ex.InnerException as SqlException;
                int errorNumber = sqlException.Number;
                switch (errorNumber)
                {
                    case 547: throw new TicketingException("Cannot update due to foreign key constraint", 1002); break;
                    default: throw new TicketingException(sqlException.Message, 1099);
                }
>>>>>>> e12ad82701c571233829a19528c1b237e50c6c9d
            }
        }

        public async Task DeleteTicketTypeAsync(string ticketTypeId)
        {
            try
            {
                TicketType ticketTypeToDelete = await context.TicketTypes.Include(tt => tt.Tickets).FirstOrDefaultAsync(tt => tt.TicketTypeId == ticketTypeId);

                if (ticketTypeToDelete == null)
                {
                    throw new TicketingException("TicketType not found for deletion.", 3008);
                }

                if (ticketTypeToDelete.Tickets.Count > 0)
                {
                    throw new TicketingException("Cannot delete because this TicketType has related tickets.", 3009);
                }

                context.TicketTypes.Remove(ticketTypeToDelete);
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new TicketingException("Error deleting TicketType." + ex.Message,599);
            }

        }

    }
}
