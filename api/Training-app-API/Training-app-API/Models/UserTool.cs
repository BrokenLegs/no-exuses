namespace Training_app_API.Models
{
    public class UserTool
    {
        public int? UserId { get; set; }
        public User? User { get; set; }

        public int? ToolId { get; set; }
        public Tool? Tool { get; set; }
    }
}
