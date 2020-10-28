using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace VideoCourseAPI.Models
{
    public partial class Course
    {
        public virtual ICollection<Author> Authors { get; set; }
    }
}
