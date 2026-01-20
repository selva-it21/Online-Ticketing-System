using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TicketRaisingLibrary.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Department",
                columns: table => new
                {
                    DeptId = table.Column<string>(type: "CHAR(4)", nullable: false),
                    DeptName = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    Description = table.Column<string>(type: "VARCHAR(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Department", x => x.DeptId);
                });

            migrationBuilder.CreateTable(
                name: "SLA",
                columns: table => new
                {
                    SLAId = table.Column<string>(type: "CHAR(4)", nullable: false),
                    SLAName = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    Priority = table.Column<string>(type: "VARCHAR(20)", nullable: true),
                    ResponseTime = table.Column<int>(type: "int", nullable: false),
                    ResolutionHours = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SLA", x => x.SLAId);
                });

            migrationBuilder.CreateTable(
                name: "Employee",
                columns: table => new
                {
                    EmpId = table.Column<string>(type: "CHAR(4)", nullable: false),
                    EmpName = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    Password = table.Column<string>(type: "VARCHAR(15)", nullable: true),
                    Role = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    DeptId = table.Column<string>(type: "CHAR(4)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employee", x => x.EmpId);
                    table.ForeignKey(
                        name: "FK_Employee_Department_DeptId",
                        column: x => x.DeptId,
                        principalTable: "Department",
                        principalColumn: "DeptId");
                });

            migrationBuilder.CreateTable(
                name: "TicketTypes",
                columns: table => new
                {
                    TicketTypeId = table.Column<string>(type: "CHAR(4)", nullable: false),
                    TypeName = table.Column<string>(type: "VARCHAR(30)", nullable: true),
                    Description = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    SLAId = table.Column<string>(type: "CHAR(4)", nullable: true),
                    DeptId = table.Column<string>(type: "CHAR(4)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketTypes", x => x.TicketTypeId);
                    table.ForeignKey(
                        name: "FK_TicketTypes_Department_DeptId",
                        column: x => x.DeptId,
                        principalTable: "Department",
                        principalColumn: "DeptId");
                    table.ForeignKey(
                        name: "FK_TicketTypes_SLA_SLAId",
                        column: x => x.SLAId,
                        principalTable: "SLA",
                        principalColumn: "SLAId");
                });

            migrationBuilder.CreateTable(
                name: "Ticket",
                columns: table => new
                {
                    TicketId = table.Column<string>(type: "CHAR(4)", nullable: false),
                    Title = table.Column<string>(type: "CHAR(15)", nullable: true),
                    Description = table.Column<string>(type: "CHAR(50)", nullable: true),
                    TicketTypeId = table.Column<string>(type: "CHAR(4)", nullable: true),
                    TicketCreatedDate = table.Column<DateTime>(type: "DATETIME", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedByEmpId = table.Column<string>(type: "CHAR(4)", nullable: true),
                    AssignedToEmpId = table.Column<string>(type: "CHAR(4)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ticket", x => x.TicketId);
                    table.ForeignKey(
                        name: "FK_Ticket_Employee_AssignedToEmpId",
                        column: x => x.AssignedToEmpId,
                        principalTable: "Employee",
                        principalColumn: "EmpId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Ticket_Employee_CreatedByEmpId",
                        column: x => x.CreatedByEmpId,
                        principalTable: "Employee",
                        principalColumn: "EmpId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Ticket_TicketTypes_TicketTypeId",
                        column: x => x.TicketTypeId,
                        principalTable: "TicketTypes",
                        principalColumn: "TicketTypeId");
                });

            migrationBuilder.CreateTable(
                name: "TicketReply",
                columns: table => new
                {
                    ReplyId = table.Column<string>(type: "CHAR(6)", nullable: false),
                    TicketId = table.Column<string>(type: "CHAR(4)", nullable: true),
                    ReplyMessage = table.Column<string>(type: "CHAR(100)", nullable: true),
                    ReplyByCreatorEmpId = table.Column<string>(type: "CHAR(4)", nullable: true),
                    ReplyByAssignedEmpId = table.Column<string>(type: "CHAR(4)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketReply", x => x.ReplyId);
                    table.ForeignKey(
                        name: "FK_TicketReply_Employee_ReplyByAssignedEmpId",
                        column: x => x.ReplyByAssignedEmpId,
                        principalTable: "Employee",
                        principalColumn: "EmpId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TicketReply_Employee_ReplyByCreatorEmpId",
                        column: x => x.ReplyByCreatorEmpId,
                        principalTable: "Employee",
                        principalColumn: "EmpId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TicketReply_Ticket_TicketId",
                        column: x => x.TicketId,
                        principalTable: "Ticket",
                        principalColumn: "TicketId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employee_DeptId",
                table: "Employee",
                column: "DeptId");

            migrationBuilder.CreateIndex(
                name: "IX_Ticket_AssignedToEmpId",
                table: "Ticket",
                column: "AssignedToEmpId");

            migrationBuilder.CreateIndex(
                name: "IX_Ticket_CreatedByEmpId",
                table: "Ticket",
                column: "CreatedByEmpId");

            migrationBuilder.CreateIndex(
                name: "IX_Ticket_TicketTypeId",
                table: "Ticket",
                column: "TicketTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketReply_ReplyByAssignedEmpId",
                table: "TicketReply",
                column: "ReplyByAssignedEmpId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketReply_ReplyByCreatorEmpId",
                table: "TicketReply",
                column: "ReplyByCreatorEmpId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketReply_TicketId",
                table: "TicketReply",
                column: "TicketId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketTypes_DeptId",
                table: "TicketTypes",
                column: "DeptId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketTypes_SLAId",
                table: "TicketTypes",
                column: "SLAId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TicketReply");

            migrationBuilder.DropTable(
                name: "Ticket");

            migrationBuilder.DropTable(
                name: "Employee");

            migrationBuilder.DropTable(
                name: "TicketTypes");

            migrationBuilder.DropTable(
                name: "Department");

            migrationBuilder.DropTable(
                name: "SLA");
        }
    }
}
