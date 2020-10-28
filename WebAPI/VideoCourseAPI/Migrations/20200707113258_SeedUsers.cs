using Microsoft.EntityFrameworkCore.Migrations;

namespace VideoCourseAPI.Migrations
{
    public partial class SeedUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Login", "Password", "FirstName", "LastName" },
                values: new object[] 
                    { 
                        "marcin@mczernecki.pl", 
                        "8F4880EBD926BA499B5D3DF185995DE61B51543E7F19FD9CE55AE63946AC7B4C837A17B3D075AA2F156ECB814B63FA2895C6FB781088638C4F67A7E9A76CCFE8", 
                        "Marcin", 
                        "Cze"
                    });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM User");
        }
    }
}