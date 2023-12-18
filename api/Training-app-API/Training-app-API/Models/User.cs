using System.ComponentModel.DataAnnotations;

namespace Training_app_API.Models
{
    public enum Gender
    {
        Man,
        Woman
    }

    public class User
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        public string? Name { get; set; }
        [EmailAddress]
        public string? Email { get; set; }
        public string? PasswordHash { get; set; } // TODO: Hash password
        public string? Phone { get; set; }
        public string? Goal { get; set; }
        public int? Weight { get; set; }
        public int? GoalWeight { get; set; }
        public int? Height { get; set; }
        public int? Age { get; set; }
        public Gender? Gender { get; set; }
        public ICollection<Tool>? Tools { get; set; }
        public ICollection<UserTool>? UserTools { get; set; }
        public WorkoutDiary? WorkoutDiary { get; set; }
    }
}