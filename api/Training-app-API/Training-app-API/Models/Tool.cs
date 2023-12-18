using System.ComponentModel.DataAnnotations;

namespace Training_app_API.Models
{
    public class Tool
    {
        [Key]
        public int ToolId { get; set; }
        public string? Name { get; set; }
        public ICollection<ExerciseTool> ExerciseTools { get; set; }

        public ICollection<UserTool> UserTools { get; set; }
    }
}
