import React, { useEffect, useState, useContext } from "react";
import { useGetRequest } from "@/customHooks/useApiHooks";
import AuthContext from "@/contexts/AuthContext";

export default function WorkoutWeek() {
    const { accessToken, userId } = useContext(AuthContext);
    const [fetchFailed, setFetchFailed] = useState(false);
    const [weeksWorkouts, setWeeksWorkout] = useState([]);
    const [showWorkoutWeek, setShowWorkoutWeek] = useState(false);

    const { sendRequest, isLoading, error, data } = useGetRequest(
        userId,
        accessToken
    );

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
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
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
            const data = await sendRequest(
                `https://localhost:7127/api/Users/${userId}/workout/year/${year}/week/${week}`
            );
            if (data) {
                setWeeksWorkout(data.$values);
                setFetchFailed(false);
            }
        } catch (error) {
            setFetchFailed(true);
            console.error(error);
        }
    };

    useEffect(() => {
        getWeeksWorkout(userId, year, week);
    }, [userId]);

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
                {isLoading && (
                    <div className="text-secondary-text col-span-full">
                        ...Laddar in veckans pass
                    </div>
                )}
                {fetchFailed && (
                    <div className="text-red-500 md:col-span-7">
                        Failed to fetch data
                    </div>
                )}

                {daysOfWeek.map((day) => (
                    <div className="text-secondary-text " key={day}>
                        <h3 className="font-bold my-2">{day}</h3>
                        {weeksWorkouts &&
                            weeksWorkouts.map((workoutday) => {
                                // Create a new Date object from workoutday.date
                                let workoutDate = new Date(workoutday.date);
                                // Get the day of the week as a number (0 for Sunday, 1 for Monday, etc.)
                                let workoutDayOfWeek = workoutDate.getDay();

                                // Check if workoutDayOfWeek is the same as the current day
                                if (
                                    workoutDayOfWeek === daysOfWeekNumbers[day]
                                ) {
                                    return (
                                        <p key={workoutday.workoutExerciseId}>
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
