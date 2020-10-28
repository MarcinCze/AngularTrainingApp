using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace VideoCourseAPI.Models
{
    public partial class UserCourse
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CourseId { get; set; }

        public virtual Course Course { get; set; }

        [JsonIgnore]
        public virtual User User { get; set; }
    }
}
