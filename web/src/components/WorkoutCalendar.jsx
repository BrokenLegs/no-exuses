import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "../styles/Calendar.module.css";
import axios from "axios";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

export default function WorkoutCalendar() {
  const [date, setDate] = useState(new Date());
  const [allWorkoutDates, setAllWorkoutDates] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [fetchfailed, setFetchfailed] = useState(false); // Add a loading state
  const [showCalendar, setShowCalendar] = React.useState(true);

  //Fetch the users workout dates from the API
  const getWorkoutDates = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7127/api/Users/1/workout/dates/all"
      );
      setAllWorkoutDates(
        response.data.$values.map(
          (date) => new Date(date).toISOString().split("T")[0]
        )
      );
      setLoading(false);
    } catch (error) {
      // console.error(error);
      setLoading(false);
      setFetchfailed(true);
    }
  };

  useEffect(() => {
    getWorkoutDates();
  }, []);

  return (
    <>
      <button
        className="w-full font-bold py-4 general-component"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        Calendar {showCalendar ? "▲" : "▼"}
      </button>
      {showCalendar && (
        <div className="mx-auto">
          {loading && ( // Render a loading message while the data is being fetched
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-l-2 border-cyan-500"></div>
            </div>
          )}

          {!loading &&
            !fetchfailed && ( // Render the calendar if the data was fetched successfully
              <Calendar
                showWeekNumbers={true}
                onChange={setDate}
                value={date}
                className={`${styles.calendar} `}
                tileClassName={({ date, view }) =>
                  view === "month" &&
                  allWorkoutDates.find(
                    //split the datetime string to only compare the date
                    (workoutDate) =>
                      workoutDate === date.toISOString().split("T")[0]
                  )
                    ? styles["has-workout"]
                    : ""
                }
              />
            )}
          {fetchfailed && ( //Render an error message if the data failed to fetch
            <div className="flex justify-center items-center">
              <p className="text-red-500 text-2xl">
                Failed to fetch workout dates
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
