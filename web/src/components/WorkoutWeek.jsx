import React, { useEffect, useState } from "react";
import axios from "axios";

export default function WorkoutWeek() {
    const [loading, setLoading] = useState(true);
    const [fetchFailed, setFetchFailed] = useState(false);
    const [weeksWorkouts, setWeeksWorkout] = useState([]);
    const [showWorkoutWeek, setShowWorkoutWeek] = useState(false);

    const [userId, setUserId] = useState(1); // TODO: Get user id from context
    const [year, setYear] = useState(new Date().getFullYear());
    const [week, setWeek] = useState(getCurrentWeekNumber());

    const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];
    const daysOfWeekNumbers = {
        Monday: 0,
        Tuesday: 1,
        Wednesday: 2,
        Thursday: 3,
        Friday: 4,
        Saturday: 5,
        Sunday: 6,
    };

    function getCurrentWeekNumber() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const day = start.getDay();
        // Calculate the day number of the year
        const dayNum = Math.floor((now - start + 86400000) / 86400000);
        // Week 1 is the week with January 4th in it
        const weekNum = Math.ceil((dayNum + day - 1) / 7);
        return weekNum;
    }

    const getWeeksWorkout = async (userId, year, week) => {
        try {
            await axios
                .get(
                    `https://localhost:7127/api/Users/${userId}/workout/year/${year}/week/${week}`
                )
                .then((response) => {
                    setWeeksWorkout(response.data.$values);
                    setLoading(false);
                    console.log(response.data.$values);
                });
        } catch (error) {
            setFetchFailed(true);
            setLoading(false);
            console.error(error);
        }
    };

    useEffect(() => {
        getWeeksWorkout(userId, year, week);
        console.log(week);
    }, []);

    return (
        <div className="general-component py-4 ">
            <button
                className="w-full font-bold"
                onClick={() => setShowWorkoutWeek(!showWorkoutWeek)}
            >
                Veckans träningspass {showWorkoutWeek ? "▲" : "▼"}
            </button>
            <div
                className={` workoutweek-container  
        grid md:grid-cols-7 gap-2 text-center ${
            showWorkoutWeek ? "hidden-transition" : "visible-transition"
        }`}
            >
                {loading && (
                    <div className="text-secondary-text col-span-full">
                        ...Laddar in veckans pass
                    </div>
                )}
                {fetchFailed && (
                    <div className="text-red-500 basis-full">
                        Failed to fetch data
                    </div>
                )}

                {daysOfWeek.map((day) => (
                    <div className="text-secondary-text " key={day}>
                        <h3 className="font-bold my-2">{day}</h3>
                        {weeksWorkouts.map((workoutday) => {
                            // Create a new Date object from workoutday.date
                            let workoutDate = new Date(workoutday.date);
                            // Get the day of the week as a number (0 for Sunday, 1 for Monday, etc.)
                            let workoutDayOfWeek = workoutDate.getDay();

                            // Check if workoutDayOfWeek is the same as the current day
                            if (
                                workoutDayOfWeek - 1 ===
                                daysOfWeekNumbers[day]
                            ) {
                                return (
                                    <p
                                        key={
                                            day + " " + workoutday.exerciseName
                                        }
                                    >
                                        {workoutday.exerciseName}
                                    </p>
                                );
                            }
                            return null; // Return null if the days don't match
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
