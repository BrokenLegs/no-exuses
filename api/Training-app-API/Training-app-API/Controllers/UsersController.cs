
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Training_app_API.Data;
using Training_app_API.Models;

namespace Training_app_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly Training_app_APIContext _context;

        public UsersController(Training_app_APIContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
          if (_context.User == null)
          {
              return NotFound();
          }
            return await _context.User.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
          if (_context.User == null)
          {
              return NotFound();
          }
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
        //Returns all exercises for today for the user
        [HttpGet("{id}/workout/today")]
        public async Task<ActionResult<IEnumerable<Exercise>>> GetUsersWorkoutToday(int id)
        {
            var currentDate = DateTime.Now.Date;

            var exercises = await _context.User
                .Where(u => u.UserId == id)
                .Select(u => u.WorkoutDiary)
                .SelectMany(wd => wd.Workouts)
                .Where(w => w.Date == currentDate)
                .SelectMany(w => w.WorkoutExercises)
                .Select(we => we.Exercise)
                .ToListAsync();
                

            // if (!exercises.Any())
            // {
            //     return NotFound("No workouts found for today");
            // }

            return Ok(exercises);
        }

        //Returns all exercises for a specific week for the user that is chosen by the user. The week shall always start on a monday. 
        [HttpGet("{id}/workout/week/{week}")]
        public async Task<ActionResult<IEnumerable<Exercise>>> GetUsersWorkoutWeek(int id, int week)
        {
            var jan1 = new DateTime(DateTime.Now.Year, 1, 1);
            int daysOffset = DayOfWeek.Thursday - jan1.DayOfWeek;

            var firstThursday = jan1.AddDays(daysOffset);
            var firstWeek = CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(firstThursday, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);

            var weekNum = week;
            if (firstWeek <= 1)
            {
                weekNum -= 1;
            }

            var result = firstThursday.AddDays(weekNum * 7);
            var weekStart = result.AddDays(-3);
            var weekEnd = weekStart.AddDays(6);

            var exercises = await _context.User
    .Where(u => u.UserId == id)
    .SelectMany(u => u.WorkoutDiary.Workouts)
    .Where(w => w.Date.Date >= weekStart && w.Date.Date <= weekEnd)
    .SelectMany(w => w.WorkoutExercises)
    .Select(we => new { Exercise = we.Exercise, Date = we.Workout.Date })
    .ToListAsync();

            if (!exercises.Any())
            {
                return NotFound("No workouts found for this week");
            }

            return Ok(exercises);
        }


        //Returns all dates the user has worked out
        [HttpGet("{id}/workout/dates/all")]
        public async Task<ActionResult<IEnumerable<DateTime>>> GetUsersWorkoutdates(int id)
        {
            var workoutDates = await _context.User
                .Where(u => u.UserId == id)
                .Select(u => u.WorkoutDiary)
                .SelectMany(wd => wd.Workouts)
                .Select(w => w.Date)
                .ToListAsync();

            if (!workoutDates.Any())
            {
                return NotFound();
            }

            return Ok(workoutDates);
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            var dbUser = await _context.User.FindAsync(id);
            if (dbUser == null)
            {
                return NotFound();
            }

            // Update the properties you want to change
            dbUser.Name = user.Name;
            dbUser.Email = user.Email;
            dbUser.PasswordHash = user.PasswordHash;
            dbUser.Phone = user.Phone;
            dbUser.Goal = user.Goal;
            dbUser.Weight = user.Weight;
            dbUser.GoalWeight = user.GoalWeight;
            dbUser.Height = user.Height;
            dbUser.Age = user.Age;
            dbUser.Gender = user.Gender;
            // ...

            try
            {
                await _context.SaveChangesAsync();
            } catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
          if (_context.User == null)
          {
              return Problem("Entity set 'Training_app_APIContext.User'  is null.");
          }
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.User == null)
            {
                return NotFound();
            }
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_context.User?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}
