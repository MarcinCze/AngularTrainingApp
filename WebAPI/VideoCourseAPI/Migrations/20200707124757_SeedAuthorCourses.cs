using Microsoft.EntityFrameworkCore.Migrations;

namespace VideoCourseAPI.Migrations
{
    public partial class SeedAuthorCourses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                DECLARE @min INT = 0;
                DECLARE @max INT = (SELECT COUNT(*) FROM Author)

                DECLARE @Counter INT = 1
                WHILE ( @Counter <= (SELECT COUNT(*) FROM Course))
                BEGIN
                    INSERT INTO AuthorCourse (CourseId, AuthorId)
	                VALUES(@Counter, FLOOR(RAND()*(@max-@min+1))+@min)
                    SET @Counter  = @Counter  + 1
                END
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM AuthorCourse");
        }
    }
}
