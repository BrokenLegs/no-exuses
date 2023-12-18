namespace Training_app_API.Models
{
    public class ExerciseVenue
    {
        public int ExerciseId { get; set; }
        public Exercise Exercise { get; set; }

        public int VenueId { get; set; }
        public Venue Venue { get; set; }
    }
}