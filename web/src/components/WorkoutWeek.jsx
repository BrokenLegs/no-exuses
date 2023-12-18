import React, { useEffect, useState } from "react";
import axios from "axios";

export default function WorkoutWeek() {
  const [loading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [weeksWorkouts, setWeeksWorkout] = useState([]);
  const [showWorkoutWeek, setShowWorkoutWeek] = useState(false);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const getWeeksWorkout = async () => {
    try {
      await axios
        .get("https://localhost:7127/api/Users/1/workout/week/50")
        .then((response) => {
          console.log(response.data.$values);
          setWeeksWorkout(response.data.$values);
          setLoading(false);
        });
    } catch (error) {
      setFetchFailed(true);
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getWeeksWorkout();
  }, []);

  return (
    <div className="general-component py-4 ">
      <button
        className="w-full font-bold"
        onClick={() => setShowWorkoutWeek(!showWorkoutWeek)}
      >
        WorkoutWeek {showWorkoutWeek ? "▲" : "▼"}
      </button>
      <div
        className={`transition-all duration-200 ease-in-out overflow-hidden workoutweek-container 
        grid md:grid-cols-7 gap-2 text-center  ${
          showWorkoutWeek ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {loading ? (
          <div className="text-secondary-text col-span-full">
            ...Loading this weeks workouts
          </div>
        ) : (
          fetchFailed && (
            <div className="text-red-500 basis-full">Failed to fetch data</div>
          )
        )}
        {daysOfWeek.map((day, index) => {
          const workoutsForDay = weeksWorkouts.filter(
            (workout) => new Date(workout.date).getDay() === index + 1
          );
          return (
            <div key={day} className="">
              <h2 className="font-bold ">{day}</h2>
              {workoutsForDay.length > 0 &&
                workoutsForDay.map((workout) => (
                  <div
                    className="text-secondary-text"
                    key={day + workout.exercise.name}
                  >
                    {workout.exercise.name}
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
