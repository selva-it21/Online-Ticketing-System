using System;
using UserLibrary.Models;

namespace UserLibrary.Repos;

public interface IUserRepository
{
    Task RegisterAsync(LoginUser user);
    Task<LoginUser> LoginAsync(string username, string password);
}
