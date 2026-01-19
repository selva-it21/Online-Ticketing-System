using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace TicketRaisingWebApi.Controllers
{
[Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpGet("{userName}/{role}/{secretkey}")]
        public string GetToken(string userName,string role,string secretkey)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretkey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            Claim[] claims = new []
            {
                new Claim(ClaimTypes.Name, userName),
                new Claim(ClaimTypes.Role, role)
            };
            var token = new JwtSecurityToken(
                issuer: "https://www.team3.com",
                audience: "https://www.team3.com",
                expires: DateTime.Now.AddHours(2),
                signingCredentials: credentials,
                claims: claims
                );
                return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
