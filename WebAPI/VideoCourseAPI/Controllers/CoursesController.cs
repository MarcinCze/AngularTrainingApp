using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VideoCourseAPI.Models;

namespace VideoCourseAPI.Controllers
{
    [Authorize]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        protected readonly VideoCourseDBContext context;

        public CoursesController(VideoCourseDBContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// Action: get all courses
        /// </summary>
        /// <returns>List of courses</returns>
        [HttpGet("api/courses")]
        public async Task<IEnumerable<Course>> Get()
        {
            int userId = int.Parse(User.Claims.First(x => x.Type == "Id").Value);

            return await context.Course
                .Include(x => x.UserCourse)
                .Where(x => x.UserCourse.Any(c => c.UserId == userId))
                .OrderBy(x => x.CreationDate)
                .ToListAsync();
        }

        /// <summary>
        /// Action: get courses in parts
        /// </summary>
        /// <param name="perPage">Number of courses on page</param>
        /// <param name="pageNr">Page number</param>
        /// <returns>List of courses in specified part</returns>
        [HttpGet("api/courses/{perPage}/{pageNr}")]
        public async Task<ActionResult<CoursesPagingResults>> GetPart(int perPage, int pageNr)
        {
            var allCourses = (await Get()).ToList();
            var result = new CoursesPagingResults
            {
                TotalCount = allCourses.Count,
                CoursesPerPage = perPage,
                RequestedPageNumber = pageNr
            };

            double pages = Math.Ceiling(((double)result.TotalCount / (double)perPage));

            if (pageNr > pages)
                return StatusCode(416);

            int currentPage = 0;
            var container = new Dictionary<int, List<Course>>();
            foreach (var course in allCourses)
            {
                if (!container.ContainsKey(currentPage))
                    container.Add(currentPage, new List<Course>());

                if (container[currentPage].Count == perPage)
                {
                    currentPage++;
                    container.Add(currentPage, new List<Course>());
                }

                container[currentPage].Add(course);
            }

            result.Courses = container[pageNr-1];
            return result;
        }

        /// <summary>
        /// Action: get courses by search word
        /// </summary>
        /// <param name="searchWord">Word to find</param>
        /// <returns>Courses list</returns>
        [HttpGet("api/courses/search/{searchWord}")]
        public async Task<IEnumerable<Course>> Search(string searchWord)
        {
            int userId = int.Parse(User.Claims.First(x => x.Type == "Id").Value);

            var list = await context.Course
                .Include(x => x.UserCourse)
                .Where(x => x.UserCourse.Any(c => c.UserId == userId))
                .ToListAsync();

            return list
                .Where(x => x.Title.Contains(searchWord, StringComparison.InvariantCultureIgnoreCase))
                .OrderBy(x => x.CreationDate);
        }
    }
}
