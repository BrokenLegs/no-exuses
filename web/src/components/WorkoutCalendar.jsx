import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "../styles/Calendar.module.css";
import axios from "axios";
import AddWorkoutModal from "./AddWorkoutModal";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

export default function WorkoutCalendar() {
    let userId = 1; //TODO: Get the user id from the logged in user
    const [clickedDate, setClickedDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [allWorkoutDates, setAllWorkoutDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchfailed, setFetchfailed] = useState(false);
    const [showCalendar, setShowCalendar] = useState(true);

    const [showModal, setShowModal] = useState(false);

    const [workoutForSelectedDate, setWorkoutForSelectedDate] = useState([]);

    //Fetch the users workout dates from the API to be used in the calendar
    const getWorkoutDates = async () => {
        try {
            const response = await axios.get(
                `https://localhost:7127/api/Users/${userId}/workout/dates/all`
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

    //Fetch the workout for the selected date
    const getWorkoutForSelectedDate = async (userId, date) => {
        try {
            const response = await axios
                .get(
                    `https://localhost:7127/api/Workouts/${userId}/date/${date}`
                )
                .then((response) => {
                    setWorkoutForSelectedDate(response.data);
                });
        } catch (error) {
            setWorkoutForSelectedDate([]);
        }
    };

    useEffect(() => {
        getWorkoutDates();
        getWorkoutForSelectedDate(userId, clickedDate);
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
                <div className="">
                    {loading && ( // Render a loading message while the data is being fetched
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-l-2 border-cyan-500"></div>
                        </div>
                    )}

                    {!loading &&
                        !fetchfailed && ( // Render the calendar if the data was fetched successfully
                            <Calendar
                                showWeekNumbers={true}
                                value={clickedDate}
                                className={`${styles.calendar} mx-auto`}
                                onClickDay={(value) => {
                                    let localDate = new Date(
                                        value.getTime() -
                                            value.getTimezoneOffset() * 60000
                                    );
                                    let dateString = localDate
                                        .toISOString()
                                        .split("T")[0];
                                    setClickedDate(dateString);
                                    getWorkoutForSelectedDate(
                                        userId,
                                        dateString
                                    );
                                }}
                                tileClassName={({ date, view }) =>
                                    view === "month" &&
                                    allWorkoutDates.find(
                                        //split the datetime string to only compare the date
                                        (workoutDate) =>
                                            workoutDate ===
                                            date.toISOString().split("T")[0]
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
                    {clickedDate && (
                        <>
                            <div className="general-component mt-4">
                                <button
                                    className=" add-button relative w-full"
                                    onClick={() => setShowModal(true)}
                                >
                                    Lägg till pass för{" "}
                                    <span className="font-bold ">
                                        {" " + clickedDate.split("T")[0]}?
                                    </span>
                                </button>
                                {/* Modal for adding exercises to a workout from the specific clicked date */}
                                {showModal && (
                                    <AddWorkoutModal
                                        userId={userId}
                                        date={clickedDate}
                                        onModalClose={() => setShowModal(false)}
                                    />
                                )}

                                {clickedDate &&
                                    workoutForSelectedDate?.exercises && (
                                        <div className="py-4 general-component">
                                            {workoutForSelectedDate.exercises.map(
                                                (exercise, index) => {
                                                    const {
                                                        exerciseName,
                                                        sets,
                                                        reps,
                                                    } = exercise;
                                                    return (
                                                        <div key={index}>
                                                            <p>
                                                                <span className="font-bold">
                                                                    {
                                                                        exerciseName
                                                                    }
                                                                </span>
                                                                {": "}
                                                                {sets}
                                                                {exerciseName ==
                                                                "Löpning"
                                                                    ? "km "
                                                                    : "Set "}
                                                                {reps}
                                                                {exerciseName ==
                                                                "Löpning"
                                                                    ? "min"
                                                                    : "Rep"}
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    )}
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
