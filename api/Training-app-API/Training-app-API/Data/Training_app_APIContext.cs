using Microsoft.EntityFrameworkCore;
using Training_app_API.Models;

namespace Training_app_API.Data
{
    public class Training_app_APIContext :DbContext
    {
        public Training_app_APIContext(DbContextOptions<Training_app_APIContext> options)
            : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //UserTool Relation
            modelBuilder.Entity<UserTool>()
            .HasKey(ut => new { ut.UserId, ut.ToolId });

            modelBuilder.Entity<UserTool>()
                .HasOne(ut => ut.User)
                .WithMany(u => u.UserTools)
                .HasForeignKey(ut => ut.UserId);

            modelBuilder.Entity<UserTool>()
                .HasOne(ut => ut.Tool)
                .WithMany(t => t.UserTools)
                .HasForeignKey(ut => ut.ToolId);

            //WorkoutDiary relations
            modelBuilder.Entity<WorkoutDiary>()
                .HasMany(wd => wd.Workouts)
                .WithOne()
                .HasForeignKey(w => w.WorkoutDiaryId);


            //User relations
            modelBuilder.Entity<User>()
                .HasOne(u => u.WorkoutDiary)
                .WithOne(wd => wd.User)
                .HasForeignKey<WorkoutDiary>(wd => wd.UserId);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Tools);



            //Workout relations
            modelBuilder.Entity<Workout>()
                 .HasOne(w => w.WorkoutDiary)
                 .WithMany(wd => wd.Workouts)
                 .HasForeignKey(w => w.WorkoutDiaryId)
                 .OnDelete(DeleteBehavior.Cascade);


            //WorkoutExercise relations
            modelBuilder.Entity<WorkoutExercise>()
                .HasOne(we => we.Workout)
                .WithMany(w => w.WorkoutExercises)
                .HasForeignKey(we => we.WorkoutId);

            //Exercise relations
            modelBuilder.Entity<Exercise>()
             .HasMany(e => e.MuscleGroups);
            modelBuilder.Entity<Exercise>()
                .HasMany(e => e.Tools);
            modelBuilder.Entity<Exercise>()
                .HasMany(e => e.Venues);
            modelBuilder.Entity<Exercise>()
                .HasMany(e => e.TrainingTypes);

            //ExerciseMuscleGroup relations
            modelBuilder.Entity<ExerciseMuscleGroup>()
                .HasKey(emg => new { emg.ExerciseId, emg.MuscleGroupId });

            modelBuilder.Entity<ExerciseMuscleGroup>()
                .HasOne(emg => emg.Exercise)
                .WithMany(e => e.ExerciseMuscleGroups)
                .HasForeignKey(emg => emg.ExerciseId);

            modelBuilder.Entity<ExerciseMuscleGroup>()
                .HasOne(emg => emg.MuscleGroup)
                .WithMany(mg => mg.ExerciseMuscleGroups)
                .HasForeignKey(emg => emg.MuscleGroupId);

            modelBuilder.Entity<ExerciseTool>()
                .HasKey(et => new { et.ExerciseId, et.ToolId });

            modelBuilder.Entity<ExerciseTool>()
                .HasOne(et => et.Exercise)
                .WithMany(e => e.ExerciseTools)
                .HasForeignKey(et => et.ExerciseId);

            modelBuilder.Entity<ExerciseTool>()
                .HasOne(et => et.Tool)
                .WithMany(t => t.ExerciseTools)
                .HasForeignKey(et => et.ToolId);

            modelBuilder.Entity<ExerciseVenue>()
                .HasKey(ev => new { ev.ExerciseId, ev.VenueId });

            modelBuilder.Entity<ExerciseVenue>()
                .HasOne(ev => ev.Exercise)
                .WithMany(e => e.ExerciseVenues)
                .HasForeignKey(ev => ev.ExerciseId);

            modelBuilder.Entity<ExerciseVenue>()
                .HasOne(ev => ev.Venue)
                .WithMany(v => v.ExerciseVenues)
                .HasForeignKey(ev => ev.VenueId);

            modelBuilder.Entity<ExerciseTrainingType>()
                .HasKey(ett => new { ett.ExerciseId, ett.TrainingTypeId });

            modelBuilder.Entity<ExerciseTrainingType>()
                .HasOne(ett => ett.Exercise)
                .WithMany(e => e.ExerciseTrainingTypes)
                .HasForeignKey(ett => ett.ExerciseId);

            modelBuilder.Entity<ExerciseTrainingType>()
                .HasOne(ett => ett.TrainingType)
                .WithMany(tt => tt.ExerciseTrainingTypes)
                .HasForeignKey(ett => ett.TrainingTypeId);

            // Seed data
            modelBuilder.Entity<User>()
                .HasData(new User
                {
                    UserId = 1,
                    Name = "Kalle",
                    Email = "Kalles@mail.com",
                    Age = 35,
                    Gender = 0,
                    Goal = "Bli DunderBiff",
                    Weight = 70,
                    GoalWeight = 80,
                    Height = 176,
                    PasswordHash = "123", // TODO: Hash this password
                    Phone = "123123",
                });

            modelBuilder.Entity<WorkoutDiary>()
               .HasData(new WorkoutDiary
               {
                   WorkoutDiaryId = 1,
                   UserId = 1,
                   Date = new DateTime(2021, 2, 2),
               });

           
               

            modelBuilder.Entity<Workout>()
                .HasData(
                    new Workout { WorkoutId = 1, WorkoutDiaryId = 1, Comment = "Bra jobbat!",
                        Date = new DateTime(2023, 12, 13),
                    },
                    new Workout { WorkoutId = 2, WorkoutDiaryId = 1 , Comment = ":D!",
                        Date = new DateTime(2023, 12, 14),
                    },
                    new Workout { WorkoutId = 3, WorkoutDiaryId = 1 , Comment = "Good!",
                        Date = new DateTime(2023, 12, 9),
                    },
                    new Workout
                    {
                        WorkoutId = 4, WorkoutDiaryId = 1, Comment = "Good!", 
                        Date = new DateTime(2023, 12, 18),
                    },
                    new Workout
                    {
                        WorkoutId = 5, WorkoutDiaryId = 1, Comment = "Good!",
                        Date = new DateTime(2023, 12, 15),
                    }
                );

            modelBuilder.Entity<WorkoutExercise>()
                .HasData(
                    new WorkoutExercise { WorkoutExerciseId = 1, ExerciseId = 1, Sets = 3, Reps = 10, WorkoutId = 1 },
                    new WorkoutExercise { WorkoutExerciseId = 3, ExerciseId = 3, Sets = 3, Reps = 10, WorkoutId = 1 },
                    new WorkoutExercise { WorkoutExerciseId = 2, ExerciseId = 2, Sets = 3, Reps = 10, WorkoutId = 2 },
                    new WorkoutExercise { WorkoutExerciseId = 4, ExerciseId = 3, Sets = 3, Reps = 10, WorkoutId = 3 },
                    new WorkoutExercise { WorkoutExerciseId = 5, ExerciseId = 1, Sets = 3, Reps = 10, WorkoutId = 4 },
                    new WorkoutExercise { WorkoutExerciseId = 6, ExerciseId = 4, Sets = 1, Reps = 1, WorkoutId = 5 }

                );

            modelBuilder.Entity<Exercise>().HasData(
                new Exercise
                {
                    ExerciseId = 1,
                    Name = "Marklyft",
                    Description = "Lyft upp, ställ ner, etc etc",
                    Instruction = "Akta ryggen",
                },
                new Exercise
                {
                    ExerciseId = 2,
                    Name = "Bänkpress",
                    Description = "Tryck upp, Sänk, etc etc",
                    Instruction = "Akta Axlarna",
                },
                new Exercise
                {
                    ExerciseId = 3,
                    Name = "Knäböj",
                    Description = "Pressa upp, Sänk, etc etc",
                    Instruction = "Akta Axlar",
                },
                new Exercise
                {
                    ExerciseId = 4,
                    Name = "Löpning",
                    Description = "Fortsätt springa",
                    Instruction = "Höger, vänster, repeat" +
                    ",A" +
                    "",
                }
            );

            modelBuilder.Entity<MuscleGroup>().HasData(
                new MuscleGroup
                {
                    MuscleGroupId = 1,
                    Name = "Rygg",
                },
                new MuscleGroup
                {
                    MuscleGroupId = 2,
                    Name = "Ben"
                },
                new MuscleGroup
                {
                    MuscleGroupId = 3,
                    Name = "Mage"
                },
                new MuscleGroup
                {
                    MuscleGroupId = 4,
                    Name = "Bröst"
                },
                new MuscleGroup
                {
                    MuscleGroupId = 5,
                    Name = "Triceps"
                }
            );

            modelBuilder.Entity<Tool>().HasData(
                 new Tool
                 {
                     ToolId = 1,
                     Name = "Hantlar"
                 },
                 new Tool
                 {
                     ToolId = 2,
                     Name = "Skivstång"
                 },
                 new Tool
                 {
                     ToolId = 3,
                     Name = "Maskin"
                 }
            );

            modelBuilder.Entity<Venue>().HasData(
                new Venue
                {
                    VenueId = 1,
                    Name = "Gym"
                },
                new Venue
                {
                    VenueId = 2,
                    Name = "Hemma"
                },
                new Venue
                {
                    VenueId = 3,
                    Name = "Utomhus"
                }
            );

            modelBuilder.Entity<TrainingType>()
                .HasData(
                    new TrainingType { TrainingTypeId = 1, Name = "Styrketräning" },
                    new TrainingType { TrainingTypeId = 2, Name = "Funktionell" },
                    new TrainingType { TrainingTypeId = 3, Name = "Kondition" },
                    new TrainingType { TrainingTypeId = 4, Name = "Flexibilitet" },
                    new TrainingType { TrainingTypeId = 5, Name = "Basövning" },
                    new TrainingType { TrainingTypeId = 6, Name = "Isolationsträning" }
                );

            modelBuilder.Entity<ExerciseTool>().HasData(
                new ExerciseTool { ExerciseId = 1, ToolId = 2 },
                new ExerciseTool { ExerciseId = 2, ToolId = 2 },
                new ExerciseTool { ExerciseId = 3, ToolId = 2 }
            );

            modelBuilder.Entity<ExerciseVenue>().HasData(
                new ExerciseVenue { ExerciseId = 1, VenueId = 1 },
                new ExerciseVenue { ExerciseId = 2, VenueId = 1 },
                new ExerciseVenue { ExerciseId = 3, VenueId = 1 }
            );

            modelBuilder.Entity<ExerciseTrainingType>().HasData(
                new ExerciseTrainingType { ExerciseId = 1, TrainingTypeId = 1 },
                new ExerciseTrainingType { ExerciseId = 1, TrainingTypeId = 4 },
                new ExerciseTrainingType { ExerciseId = 2, TrainingTypeId = 2 },
                new ExerciseTrainingType { ExerciseId = 2, TrainingTypeId = 4 },
                new ExerciseTrainingType { ExerciseId = 3, TrainingTypeId = 1 },
                new ExerciseTrainingType { ExerciseId = 3, TrainingTypeId = 4 }
            );


        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //if (!optionsBuilder.IsConfigured)
            //{
            //optionsBuilder.UseSqlServer(@"Data Source=localhost;Initial Catalog=TrainingAppDB ;Integrated Security=True");
            optionsBuilder
                        .UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=EFLogging;Trusted_Connection=True;")
                        .LogTo(Console.WriteLine, new[] { DbLoggerCategory.Database.Command.Name }, LogLevel.Information);


            //}
        }

        public DbSet<Training_app_API.Models.User> User { get; set; }
        public DbSet<Training_app_API.Models.Exercise> Exercise { get; set; }
        public DbSet<Training_app_API.Models.MuscleGroup> MuscleGroup { get; set; }
        public DbSet<Training_app_API.Models.Tool> Tool { get; set; }
        public DbSet<Training_app_API.Models.Venue> Venues { get; set; }
        public DbSet<Training_app_API.Models.Workout> Workout { get; set; }
        public DbSet<Training_app_API.Models.WorkoutDiary> WorkoutDiary { get; set; }
        public DbSet<Training_app_API.Models.WorkoutExercise> WorkoutExercise { get; set; }
        public DbSet<Training_app_API.Models.TrainingType> TrainingType { get; set; }
        public DbSet<Training_app_API.Models.ExerciseMuscleGroup> ExerciseMuscleGroup { get; set; }
        public DbSet<Training_app_API.Models.ExerciseTool> ExerciseTool { get; set; }
        public DbSet<Training_app_API.Models.ExerciseVenue> ExerciseVenue { get; set; }
        public DbSet<Training_app_API.Models.ExerciseTrainingType> ExerciseTrainingType { get; set; }
        public DbSet<Training_app_API.Models.UserTool> UserTool { get; set; }

    }

}
