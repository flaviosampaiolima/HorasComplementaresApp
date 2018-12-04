using Microsoft.EntityFrameworkCore.Migrations;

namespace HorasComplementaresApp.Migrations
{
    public partial class ActivityType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "Courses");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TenantId",
                table: "Courses",
                nullable: false,
                defaultValue: 0);
        }
    }
}
