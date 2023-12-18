using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Training_app_API.Migrations
{
    public partial class MoveProperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Exercise",
                columns: table => new
                {
                    ExerciseId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Instruction = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exercise", x => x.ExerciseId);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Goal = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Weight = table.Column<int>(type: "int", nullable: true),
                    GoalWeight = table.Column<int>(type: "int", nullable: true),
                    Height = table.Column<int>(type: "int", nullable: true),
                    Age = table.Column<int>(type: "int", nullable: true),
                    Gender = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "MuscleGroup",
                columns: table => new
                {
                    MuscleGroupId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExerciseId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MuscleGroup", x => x.MuscleGroupId);
                    table.ForeignKey(
                        name: "FK_MuscleGroup_Exercise_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercise",
                        principalColumn: "ExerciseId");
                });

            migrationBuilder.CreateTable(
                name: "TrainingType",
                columns: table => new
                {
                    TrainingTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExerciseId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingType", x => x.TrainingTypeId);
                    table.ForeignKey(
                        name: "FK_TrainingType_Exercise_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercise",
                        principalColumn: "ExerciseId");
                });

            migrationBuilder.CreateTable(
                name: "Venues",
                columns: table => new
                {
                    VenueId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExerciseId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Venues", x => x.VenueId);
                    table.ForeignKey(
                        name: "FK_Venues_Exercise_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercise",
                        principalColumn: "ExerciseId");
                });

            migrationBuilder.CreateTable(
                name: "Tool",
                columns: table => new
                {
                    ToolId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExerciseId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tool", x => x.ToolId);
                    table.ForeignKey(
                        name: "FK_Tool_Exercise_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercise",
                        principalColumn: "ExerciseId");
                    table.ForeignKey(
                        name: "FK_Tool_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateTable(
                name: "WorkoutDiary",
                columns: table => new
                {
                    WorkoutDiaryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkoutDiary", x => x.WorkoutDiaryId);
                    table.ForeignKey(
                        name: "FK_WorkoutDiary_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExerciseMuscleGroup",
                columns: table => new
                {
                    ExerciseId = table.Column<int>(type: "int", nullable: false),
                    MuscleGroupId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseMuscleGroup", x => new { x.ExerciseId, x.MuscleGroupId });
                    table.ForeignKey(
                        name: "FK_ExerciseMuscleGroup_Exercise_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercise",
                        principalColumn: "ExerciseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExerciseMuscleGroup_MuscleGroup_MuscleGroupId",
                        column: x => x.MuscleGroupId,
                        principalTable: "MuscleGroup",
                        principalColumn: "MuscleGroupId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExerciseTrainingType",
                columns: table => new
                {
                    ExerciseId = table.Column<int>(type: "int", nullable: false),
                    TrainingTypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseTrainingType", x => new { x.ExerciseId, x.TrainingTypeId });
                    table.ForeignKey(
                        name: "FK_ExerciseTrainingType_Exercise_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercise",
                        principalColumn: "ExerciseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExerciseTrainingType_TrainingType_TrainingTypeId",
                        column: x => x.TrainingTypeId,
                        principalTable: "TrainingType",
                        principalColumn: "TrainingTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExerciseVenue",
                columns: table => new
                {
                    ExerciseId = table.Column<int>(type: "int", nullable: false),
                    VenueId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseVenue", x => new { x.ExerciseId, x.VenueId });
                    table.ForeignKey(
                        name: "FK_ExerciseVenue_Exercise_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercise",
                        principalColumn: "ExerciseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExerciseVenue_Venues_VenueId",
                        column: x => x.VenueId,
                        principalTable: "Venues",
                        principalColumn: "VenueId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExerciseTool",
                columns: table => new
                {
                    ExerciseId = table.Column<int>(type: "int", nullable: false),
                    ToolId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseTool", x => new { x.ExerciseId, x.ToolId });
                    table.ForeignKey(
                        name: "FK_ExerciseTool_Exercise_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercise",
                        principalColumn: "ExerciseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExerciseTool_Tool_ToolId",
                        column: x => x.ToolId,
                        principalTable: "Tool",
                        principalColumn: "ToolId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserTool",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ToolId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTool", x => new { x.UserId, x.ToolId });
                    table.ForeignKey(
                        name: "FK_UserTool_Tool_ToolId",
                        column: x => x.ToolId,
                        principalTable: "Tool",
                        principalColumn: "ToolId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserTool_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Workout",
                columns: table => new
                {
                    WorkoutId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkoutDiaryId = table.Column<int>(type: "int", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workout", x => x.WorkoutId);
                    table.ForeignKey(
                        name: "FK_Workout_WorkoutDiary_WorkoutDiaryId",
                        column: x => x.WorkoutDiaryId,
                        principalTable: "WorkoutDiary",
                        principalColumn: "WorkoutDiaryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkoutExercise",
                columns: table => new
                {
                    WorkoutExerciseId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExerciseId = table.Column<int>(type: "int", nullable: false),
                    Sets = table.Column<int>(type: "int", nullable: false),
                    Reps = table.Column<int>(type: "int", nullable: false),
                    WorkoutId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkoutExercise", x => x.WorkoutExerciseId);
                    table.ForeignKey(
                        name: "FK_WorkoutExercise_Exercise_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercise",
                        principalColumn: "ExerciseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkoutExercise_Workout_WorkoutId",
                        column: x => x.WorkoutId,
                        principalTable: "Workout",
                        principalColumn: "WorkoutId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Exercise",
                columns: new[] { "ExerciseId", "Description", "Instruction", "Name" },
                values: new object[,]
                {
                    { 1, "Lyft upp, ställ ner, etc etc", "Akta ryggen", "Marklyft" },
                    { 2, "Tryck upp, Sänk, etc etc", "Akta Axlarna", "Bänkpress" },
                    { 3, "Pressa upp, Sänk, etc etc", "Akta Axlar", "Knäböj" }
                });

            migrationBuilder.InsertData(
                table: "MuscleGroup",
                columns: new[] { "MuscleGroupId", "ExerciseId", "Name" },
                values: new object[,]
                {
                    { 1, null, "Rygg" },
                    { 2, null, "Ben" },
                    { 3, null, "Mage" },
                    { 4, null, "Bröst" },
                    { 5, null, "Triceps" }
                });

            migrationBuilder.InsertData(
                table: "Tool",
                columns: new[] { "ToolId", "ExerciseId", "Name", "UserId" },
                values: new object[,]
                {
                    { 1, null, "Hantlar", null },
                    { 2, null, "Skivstång", null },
                    { 3, null, "Maskin", null }
                });

            migrationBuilder.InsertData(
                table: "TrainingType",
                columns: new[] { "TrainingTypeId", "ExerciseId", "Name" },
                values: new object[,]
                {
                    { 1, null, "Styrketräning" },
                    { 2, null, "Funktionell" },
                    { 3, null, "Kondition" },
                    { 4, null, "Flexibilitet" },
                    { 5, null, "Basövning" },
                    { 6, null, "Isolationsträning" }
                });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "UserId", "Age", "Email", "Gender", "Goal", "GoalWeight", "Height", "Name", "PasswordHash", "Phone", "Weight" },
                values: new object[] { 1, 35, "Kalles@mail.com", 0, "Bli DunderBiff", 80, 176, "Kalle", "123", "123123", 70 });

            migrationBuilder.InsertData(
                table: "Venues",
                columns: new[] { "VenueId", "ExerciseId", "Name" },
                values: new object[,]
                {
                    { 1, null, "Gym" },
                    { 2, null, "Hemma" },
                    { 3, null, "Utomhus" }
                });

            migrationBuilder.InsertData(
                table: "ExerciseTool",
                columns: new[] { "ExerciseId", "ToolId" },
                values: new object[,]
                {
                    { 1, 2 },
                    { 2, 2 },
                    { 3, 2 }
                });

            migrationBuilder.InsertData(
                table: "ExerciseTrainingType",
                columns: new[] { "ExerciseId", "TrainingTypeId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 1, 4 },
                    { 2, 2 },
                    { 2, 4 },
                    { 3, 1 },
                    { 3, 4 }
                });

            migrationBuilder.InsertData(
                table: "ExerciseVenue",
                columns: new[] { "ExerciseId", "VenueId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 2, 1 },
                    { 3, 1 }
                });

            migrationBuilder.InsertData(
                table: "WorkoutDiary",
                columns: new[] { "WorkoutDiaryId", "Date", "UserId" },
                values: new object[] { 1, new DateTime(2021, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 1 });

            migrationBuilder.InsertData(
                table: "Workout",
                columns: new[] { "WorkoutId", "Comment", "Date", "WorkoutDiaryId" },
                values: new object[] { 1, "Bra jobbat!", new DateTime(2021, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 1 });

            migrationBuilder.InsertData(
                table: "Workout",
                columns: new[] { "WorkoutId", "Comment", "Date", "WorkoutDiaryId" },
                values: new object[] { 2, ":D!", new DateTime(2021, 4, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 1 });

            migrationBuilder.InsertData(
                table: "Workout",
                columns: new[] { "WorkoutId", "Comment", "Date", "WorkoutDiaryId" },
                values: new object[] { 3, "Good!", new DateTime(2021, 5, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 1 });

            migrationBuilder.InsertData(
                table: "WorkoutExercise",
                columns: new[] { "WorkoutExerciseId", "ExerciseId", "Reps", "Sets", "WorkoutId" },
                values: new object[] { 1, 1, 10, 3, 1 });

            migrationBuilder.InsertData(
                table: "WorkoutExercise",
                columns: new[] { "WorkoutExerciseId", "ExerciseId", "Reps", "Sets", "WorkoutId" },
                values: new object[] { 2, 2, 10, 3, 2 });

            migrationBuilder.InsertData(
                table: "WorkoutExercise",
                columns: new[] { "WorkoutExerciseId", "ExerciseId", "Reps", "Sets", "WorkoutId" },
                values: new object[] { 3, 3, 10, 3, 3 });

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseMuscleGroup_MuscleGroupId",
                table: "ExerciseMuscleGroup",
                column: "MuscleGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseTool_ToolId",
                table: "ExerciseTool",
                column: "ToolId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseTrainingType_TrainingTypeId",
                table: "ExerciseTrainingType",
                column: "TrainingTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseVenue_VenueId",
                table: "ExerciseVenue",
                column: "VenueId");

            migrationBuilder.CreateIndex(
                name: "IX_MuscleGroup_ExerciseId",
                table: "MuscleGroup",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_Tool_ExerciseId",
                table: "Tool",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_Tool_UserId",
                table: "Tool",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingType_ExerciseId",
                table: "TrainingType",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTool_ToolId",
                table: "UserTool",
                column: "ToolId");

            migrationBuilder.CreateIndex(
                name: "IX_Venues_ExerciseId",
                table: "Venues",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_Workout_WorkoutDiaryId",
                table: "Workout",
                column: "WorkoutDiaryId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutDiary_UserId",
                table: "WorkoutDiary",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutExercise_ExerciseId",
                table: "WorkoutExercise",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutExercise_WorkoutId",
                table: "WorkoutExercise",
                column: "WorkoutId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExerciseMuscleGroup");

            migrationBuilder.DropTable(
                name: "ExerciseTool");

            migrationBuilder.DropTable(
                name: "ExerciseTrainingType");

            migrationBuilder.DropTable(
                name: "ExerciseVenue");

            migrationBuilder.DropTable(
                name: "UserTool");

            migrationBuilder.DropTable(
                name: "WorkoutExercise");

            migrationBuilder.DropTable(
                name: "MuscleGroup");

            migrationBuilder.DropTable(
                name: "TrainingType");

            migrationBuilder.DropTable(
                name: "Venues");

            migrationBuilder.DropTable(
                name: "Tool");

            migrationBuilder.DropTable(
                name: "Workout");

            migrationBuilder.DropTable(
                name: "Exercise");

            migrationBuilder.DropTable(
                name: "WorkoutDiary");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
