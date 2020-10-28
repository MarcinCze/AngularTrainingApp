using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace VideoCourseAPI.Models
{
    public partial class AuthorCourse
    {
        public int Id { get; set; }
        public int AuthorId { get; set; }
        public int CourseId { get; set; }

        public virtual Author Author { get; set; }

        [JsonIgnore]
        public virtual Course Course { get; set; }
    }
}
