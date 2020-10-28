using Microsoft.EntityFrameworkCore.Migrations;

namespace VideoCourseAPI.Migrations
{
    public partial class SeedUserCourses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                DECLARE @userID INT = (SELECT Id FROM [User] WHERE Login like 'marcin@mczernecki.pl')
                DECLARE @Counter INT = 1
                WHILE ( @Counter <= (SELECT COUNT(*) FROM Course) )
                BEGIN
	                INSERT INTO UserCourse (CourseId, UserId)
	                VALUES(@Counter, @userID)
	                SET @Counter  = @Counter  + 1
                END
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM UserCourse");
        }
    }
}
