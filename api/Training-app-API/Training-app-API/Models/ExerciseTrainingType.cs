namespace Training_app_API.Models
{
    public class ExerciseTrainingType
    {
        public int ExerciseId { get; set; }
        public Exercise Exercise { get; set; }

        public int TrainingTypeId { get; set; }
        public TrainingType TrainingType { get; set; }
    }
}