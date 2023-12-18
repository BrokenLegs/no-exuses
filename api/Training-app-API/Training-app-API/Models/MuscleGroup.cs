using System.ComponentModel.DataAnnotations;

namespace Training_app_API.Models
{
    public class MuscleGroup
    {
        [Key]
        public int MuscleGroupId { get; set; }
        public string? Name { get; set; }
        public ICollection<ExerciseMuscleGroup> ExerciseMuscleGroups { get; set; }

    }
}
