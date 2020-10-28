using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace VideoCourseAPI.Models
{
    public partial class Course
    {
        public Course()
        {
            AuthorCourse = new HashSet<AuthorCourse>();
            UserCourse = new HashSet<UserCourse>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public int Duration { get; set; }
        public string Description { get; set; }
        public bool TopRated { get; set; }
        public DateTime CreationDate { get; set; }

        [JsonIgnore]
        public virtual ICollection<AuthorCourse> AuthorCourse { get; set; }

        [JsonIgnore]
        public virtual ICollection<UserCourse> UserCourse { get; set; }
    }
}
