using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webcam_image_viewer.Migrations
{
    public partial class WebcamUserBase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CreatedBySub",
                table: "GarageImage",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "GarageImage",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "ModifiedBySub",
                table: "GarageImage",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedDate",
                table: "GarageImage",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "WebcamUser",
                columns: table => new
                {
                    Sub = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WebcamUser", x => x.Sub);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_GarageImage_CreatedBySub",
                table: "GarageImage",
                column: "CreatedBySub");

            migrationBuilder.CreateIndex(
                name: "IX_GarageImage_ModifiedBySub",
                table: "GarageImage",
                column: "ModifiedBySub");

            migrationBuilder.AddForeignKey(
                name: "FK_GarageImage_WebcamUser_CreatedBySub",
                table: "GarageImage",
                column: "CreatedBySub",
                principalTable: "WebcamUser",
                principalColumn: "Sub");

            migrationBuilder.AddForeignKey(
                name: "FK_GarageImage_WebcamUser_ModifiedBySub",
                table: "GarageImage",
                column: "ModifiedBySub",
                principalTable: "WebcamUser",
                principalColumn: "Sub");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GarageImage_WebcamUser_CreatedBySub",
                table: "GarageImage");

            migrationBuilder.DropForeignKey(
                name: "FK_GarageImage_WebcamUser_ModifiedBySub",
                table: "GarageImage");

            migrationBuilder.DropTable(
                name: "WebcamUser");

            migrationBuilder.DropIndex(
                name: "IX_GarageImage_CreatedBySub",
                table: "GarageImage");

            migrationBuilder.DropIndex(
                name: "IX_GarageImage_ModifiedBySub",
                table: "GarageImage");

            migrationBuilder.DropColumn(
                name: "CreatedBySub",
                table: "GarageImage");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "GarageImage");

            migrationBuilder.DropColumn(
                name: "ModifiedBySub",
                table: "GarageImage");

            migrationBuilder.DropColumn(
                name: "ModifiedDate",
                table: "GarageImage");
        }
    }
}
