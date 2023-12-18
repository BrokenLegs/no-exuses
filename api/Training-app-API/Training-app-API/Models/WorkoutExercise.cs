using System.ComponentModel.DataAnnotations;

namespace Training_app_API.Models
{
    public class WorkoutExercise
    {
        [Key]
        public int WorkoutExerciseId { get; set; }
        public int ExerciseId { get; set; } 
        public int Sets { get; set; }
        public int Reps { get; set; }
        public Exercise? Exercise{ get; set; }

        public int WorkoutId { get; set; }
        public Workout Workout { get; set; }
    }
}
