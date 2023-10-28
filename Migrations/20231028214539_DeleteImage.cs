using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webcam_image_viewer.Migrations
{
    public partial class DeleteImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDelete",
                table: "GarageImage",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDelete",
                table: "GarageImage");
        }
    }
}
