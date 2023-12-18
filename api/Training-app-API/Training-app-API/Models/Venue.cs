using System.ComponentModel.DataAnnotations;

namespace Training_app_API.Models
{
    public class Venue
    {
        [Key]
        public int VenueId { get; set; }
        public string? Name { get; set; }
        public ICollection<ExerciseVenue> ExerciseVenues { get; set; }


    }
}
