using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace VideoCourseAPI.Models
{
    public partial class Author
    {
        public Author()
        {
            AuthorCourse = new HashSet<AuthorCourse>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [JsonIgnore]
        public virtual ICollection<AuthorCourse> AuthorCourse { get; set; }
    }
}
