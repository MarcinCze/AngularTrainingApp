using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using VideoCourseAPI.Models;

namespace VideoCourseAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        protected IConfiguration configuration;
        protected readonly VideoCourseDBContext context;

        public AuthController(IConfiguration config, VideoCourseDBContext context)
        {
            configuration = config;
            this.context = context;
        }

        /// <summary>
        /// Action: login the user by providing mail and password
        /// </summary>
        /// <param name="userData">User credentials</param>
        /// <returns>JWT Token</returns>
        [HttpPost]
        public async Task<IActionResult> Post(LoginData userData)
        {
            if (userData?.Login == null || userData.Password == null) 
                return Unauthorized();

            var user = await GetUser(userData.Login, userData.Password);

            if (user == null)
                return Unauthorized();

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, configuration["Jwt:Subject"]),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim("Id", user.Id.ToString()),
                new Claim("FirstName", user.FirstName),
                new Claim("LastName", user.LastName),
                new Claim("Login", user.Login)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                configuration["Jwt:Issuer"], 
                configuration["Jwt:Audience"], 
                claims, 
                expires: DateTime.UtcNow.AddDays(1), 
                signingCredentials: signIn);

            return Ok(JsonSerializer.Serialize(new JwtSecurityTokenHandler().WriteToken(token)));
        }

        /// <summary>
        /// Action: obtain logged user mail, first and last name
        /// </summary>
        /// <returns>User details</returns>
        [Authorize]
        [HttpGet]
        public async Task<User> Get()
        {
            int userId = int.Parse(User.Claims.First(x => x.Type == "Id").Value);
            return await context.User.FirstAsync(x => x.Id == userId);
        }

        private async Task<User> GetUser(string login, string password)
        {
            return await context.User.FirstOrDefaultAsync(x => x.Login == login && x.Password == Hash(password));
        }

        private static string Hash(string password)
        {
            using SHA512 sha512Hash = SHA512.Create();
            byte[] sourceBytes = Encoding.UTF8.GetBytes(password);
            byte[] hashBytes = sha512Hash.ComputeHash(sourceBytes);
            return BitConverter.ToString(hashBytes).Replace("-", string.Empty);
        }
    }
}
