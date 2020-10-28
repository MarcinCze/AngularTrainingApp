using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.Formatters;

namespace VideoCourseAPI.Models
{
    public partial class User
    {
        public User()
        {
            UserCourse = new HashSet<UserCourse>();
        }

        [JsonIgnore]
        public int Id { get; set; }
        
        public string Login { get; set; }
        
        [JsonIgnore]
        public string Password { get; set; }
        
        public string FirstName { get; set; }
        
        public string LastName { get; set; }

        [JsonIgnore]
        public virtual ICollection<UserCourse> UserCourse { get; set; }
    }
}
