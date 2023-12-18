using System.ComponentModel.DataAnnotations;

namespace Training_app_API.Models
{
    public class WorkoutDiary
    {
        [Key]
        public int WorkoutDiaryId { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public ICollection<Workout>? Workouts{ get; set; }

        public User User { get; set; }

    }
}
