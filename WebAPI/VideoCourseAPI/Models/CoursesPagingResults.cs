using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VideoCourseAPI.Models
{
    public class CoursesPagingResults
    {
        public IEnumerable<Course> Courses { get; set; }
        public int TotalCount { get; set; }
        public int CoursesPerPage { get; set; }
        public int RequestedPageNumber { get; set; }
    }
}
