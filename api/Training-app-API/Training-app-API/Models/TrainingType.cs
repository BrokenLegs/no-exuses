using System.ComponentModel.DataAnnotations;

namespace Training_app_API.Models
{
    public class TrainingType
    {
        [Key]
        public int TrainingTypeId { get; set; }
        public string? Name { get; set; }
        public ICollection<ExerciseTrainingType> ExerciseTrainingTypes { get; set; }

    }
}
