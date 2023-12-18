using System.ComponentModel.DataAnnotations;

namespace Training_app_API.Models
{
    public class Workout
    {
        [Key]
        public int WorkoutId { get; set; }
        public int WorkoutDiaryId { get; set; }
        
        
        public DateTime Date { get; set; }
        public string? Comment { get; set; }
        public WorkoutDiary WorkoutDiary { get; set; }
        public ICollection<WorkoutExercise>? WorkoutExercises { get; set; }
    }
}
