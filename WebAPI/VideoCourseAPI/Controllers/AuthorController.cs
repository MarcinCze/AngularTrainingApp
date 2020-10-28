using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VideoCourseAPI.Models;

namespace VideoCourseAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        protected readonly VideoCourseDBContext context;

        public AuthorController(VideoCourseDBContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// Action: get all possible course's authors
        /// </summary>
        /// <returns>List of authors</returns>
        [HttpGet]
        public async Task<List<Author>> Get() => await context.Author.OrderBy(x => x.LastName).ToListAsync();
    }
}
