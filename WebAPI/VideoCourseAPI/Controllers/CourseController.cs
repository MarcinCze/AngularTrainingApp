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
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        protected readonly VideoCourseDBContext context;

        public CourseController(VideoCourseDBContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// Action: get single course
        /// </summary>
        /// <param name="id">Course ID</param>
        /// <returns>Course object with all details</returns>
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Course>> Get(int id)
        {
            int userId = int.Parse(User.Claims.First(x => x.Type == "Id").Value);
            Course course = await context.Course
                .Include(x => x.UserCourse)
                .FirstOrDefaultAsync(x => x.UserCourse.Any(c => c.UserId == userId) && x.Id == id);

            if (course == null)
                return NotFound();

            course.Authors = await context.Author
                .Include(x => x.AuthorCourse)
                .Where(x => x.AuthorCourse.Any(a => a.CourseId == course.Id))
                .ToListAsync();

            return course;
        }

        /// <summary>
        /// Action: create course
        /// </summary>
        /// <param name="newCourse">New course object</param>
        /// <returns>Created object</returns>
        [HttpPut]
        public async Task<Course> Put(Course newCourse)
        {
            if (newCourse.Authors != null && newCourse.Authors.Any())
            {
                newCourse.AuthorCourse = new List<AuthorCourse>();
                foreach (var author in newCourse.Authors)
                {
                    var dbAuthor = await context.Author.FirstOrDefaultAsync(x => x.FirstName == author.FirstName && x.LastName == author.LastName);

                    if (dbAuthor == null)
                        continue;

                    newCourse.AuthorCourse.Add(new AuthorCourse { AuthorId = dbAuthor.Id, CourseId = newCourse.Id});
                }
            }

            newCourse.Authors = null;

            int userId = int.Parse(User.Claims.First(x => x.Type == "Id").Value);
            newCourse.UserCourse = new List<UserCourse>
            {
                new UserCourse { CourseId = newCourse.Id, UserId = userId }
            };

            await context.Course.AddAsync(newCourse);
            await context.SaveChangesAsync();

            newCourse.Authors = await context.Author
                .Include(x => x.AuthorCourse)
                .Where(x => x.AuthorCourse.Any(a => a.CourseId == newCourse.Id))
                .ToListAsync();

            return newCourse;
        }

        /// <summary>
        /// Action: edit course
        /// </summary>
        /// <param name="course">Course to edit</param>
        /// <returns>Modified course</returns>
        [HttpPatch]
        public async Task<ActionResult<Course>> Patch(Course course)
        {
            var dbCourse = await context.Course.FirstOrDefaultAsync(x => x.Id == course.Id);

            if (dbCourse == null)
                return NotFound();

            if (course.Authors != null && course.Authors.Any())
            {
                course.AuthorCourse = new List<AuthorCourse>();
                foreach (var author in course.Authors)
                {
                    var dbAuthor = await context.Author.FirstOrDefaultAsync(x => x.FirstName == author.FirstName && x.LastName == author.LastName);

                    if (dbAuthor == null)
                        continue;

                    course.AuthorCourse.Add(new AuthorCourse { AuthorId = dbAuthor.Id, CourseId = course.Id });
                }

                if (!AreEqual(dbCourse.AuthorCourse, course.AuthorCourse))
                {
                    var courseAuthors = context.AuthorCourse.Where(x => x.CourseId == dbCourse.Id);
                    context.AuthorCourse.RemoveRange(courseAuthors);
                    await context.SaveChangesAsync();
                }

                dbCourse.AuthorCourse = course.AuthorCourse;
            }
            
            dbCourse.Title = course.Title;
            dbCourse.Description = course.Description;
            dbCourse.Duration = course.Duration;
            dbCourse.CreationDate = course.CreationDate;

            await context.SaveChangesAsync();

            return await Get(course.Id);
        }

        /// <summary>
        /// Action: remove course
        /// </summary>
        /// <param name="id">ID of course to remove</param>
        /// <returns>Removed course</returns>
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            int userId = int.Parse(User.Claims.First(x => x.Type == "Id").Value);
            UserCourse uc = await context.UserCourse.FirstOrDefaultAsync(x => x.UserId == userId && x.CourseId == id);

            if (uc == null)
                return NotFound();

            context.UserCourse.Remove(uc);
            await context.SaveChangesAsync();
            return Ok();
        }

        private static bool AreEqual(IEnumerable<AuthorCourse> first, IEnumerable<AuthorCourse> second)
        {
            if (first.Count() != second.Count())
                return false;

            List<AuthorCourse> firstList = first.OrderBy(x => x.AuthorId).ToList();
            List<AuthorCourse> secondList = second.OrderBy(x => x.AuthorId).ToList();

            return !firstList.Where((t, i) => firstList.ElementAt(i).AuthorId != secondList.ElementAt(i).AuthorId).Any();
        }
    }
}