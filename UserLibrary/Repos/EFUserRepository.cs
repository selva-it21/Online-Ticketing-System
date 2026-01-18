using System;
using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using UserLibrary.Models;

namespace UserLibrary.Repos;

public class EFUserRepository : IUserRepository {
    UserDBContext context = new UserDBContext();
    public async Task<LoginUser> LoginAsync(string username, string password) {
        try {
            LoginUser user = await (from u in context.LoginUsers where u.Username == username && u.UserPassword == password select u).FirstAsync();
            return user;
        }
        catch {
            throw new UserException("Invalid username or password");
        }
    }
    public async Task RegisterAsync(LoginUser user) {
        try {
            await context.LoginUsers.AddAsync(user);
            await context.SaveChangesAsync();
        }
        catch(Exception ex) {
            throw new UserException(ex.Message);
        }
    }
}
