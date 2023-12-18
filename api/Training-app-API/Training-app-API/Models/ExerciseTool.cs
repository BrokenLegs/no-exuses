namespace Training_app_API.Models
{
    public class ExerciseTool
    {
        public int ExerciseId { get; set; }
        public Exercise Exercise { get; set; }

        public int ToolId { get; set; }
        public Tool Tool { get; set; }
    }
}