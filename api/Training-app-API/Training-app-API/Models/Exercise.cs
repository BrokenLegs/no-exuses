using System.ComponentModel.DataAnnotations;

namespace Training_app_API.Models
{
    public class Exercise
    {
        [Key]
        public int ExerciseId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Instruction { get; set; } //Bild, video, text eller länk
        public ICollection<TrainingType>? TrainingTypes { get; set; } 
        public ICollection<Tool>? Tools{ get; set; }
        public ICollection<MuscleGroup>? MuscleGroups { get; set; }
        public ICollection<Venue>? Venues { get; set; }
        public ICollection<ExerciseMuscleGroup>? ExerciseMuscleGroups { get; set; }
        public ICollection<ExerciseTool>? ExerciseTools { get; set; }
        public ICollection<ExerciseVenue>? ExerciseVenues { get; set; }
        public ICollection<ExerciseTrainingType>? ExerciseTrainingTypes { get; set; }
    }
}
