import React, { useEffect, useState, useContext } from "react";
import AuthContext from "@/contexts/AuthContext";

import dynamic from "next/dynamic";
import styles from "../styles/Calendar.module.css";
import axios from "axios";
import { useGetRequest, useDeleteRequest } from "@/customHooks/useApiHooks";
import AddWorkoutModal from "./AddWorkoutModal";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

export default function WorkoutCalendar() {
    const { accessToken, userId } = useContext(AuthContext);
    const [clickedDate, setClickedDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [allWorkoutDates, setAllWorkoutDates] = useState([]);
    const { sendRequest, isLoading, error, data } = useGetRequest(
        userId,
        accessToken
    );
    const { sendDeleteRequest, deleteError, deleteData } = useDeleteRequest(
        userId,
        accessToken
    );

    const [showCalendar, setShowCalendar] = useState(true);

    const [showModal, setShowModal] = useState(false);

    const [workoutForSelectedDate, setWorkoutForSelectedDate] = useState([]);

    //Fetch the users workout dates from the API to be used in the calendar
    const getWorkoutDates = async () => {
        try {
            const data = await sendRequest(
                `https://localhost:7127/api/Users/${userId}/workout/dates/all`
            );
            if (data) {
                setAllWorkoutDates(
                    data.$values.map(
                        (date) => new Date(date).toISOString().split("T")[0]
                    )
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    //Fetch the workout for the selected date
    //Bug: När jag försöker implementera UseApiHooks på denna så startar
    // jag en re-render av kalendern som sabbar userexperience. Uppdaterar detta senare
    const getWorkoutForSelectedDate = async (userId, date) => {
        try {
            const response = await axios.get(
                `https://localhost:7127/api/Workouts/${userId}/date/${date}`,
                {
                    headers: accessToken
                        ? { Authorization: `Bearer ${accessToken}` }
                        : {},
                }
            );
            setWorkoutForSelectedDate(response.data);
        } catch (error) {
            setWorkoutForSelectedDate([]);
        }
    };

    //Delete a workout exercise from the workout
    const deleteWorkoutExercise = (workoutExerciseId) => async () => {
        try {
            const response = await sendDeleteRequest(
                `https://localhost:7127/api/Workouts/${userId}/deleteWorkoutExercise/${workoutExerciseId}/date/${clickedDate}`,
                {
                    headers: accessToken
                        ? { Authorization: `Bearer ${accessToken}` }
                        : {},
                }
            );
            getWorkoutForSelectedDate(userId, clickedDate);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (userId) {
            getWorkoutDates();
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            getWorkoutForSelectedDate(userId, clickedDate);
        }
    }, [userId, clickedDate]);

    return (
        <div className="">
            <button
                className="w-full font-bold py-4 general-component"
                onClick={() => setShowCalendar(!showCalendar)}
            >
                Calendar {showCalendar ? "▲" : "▼"}
            </button>
            {showCalendar && (
                <div className="">
                    {isLoading && ( // Render a loading message while the data is being fetched
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-l-2 border-cyan-500"></div>
                        </div>
                    )}

                    {!isLoading && ( // Render the calendar if the data was fetched successfully
                        // !fetchfailed &&
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
                                getWorkoutForSelectedDate(userId, dateString);
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
                    {/* {fetchfailed && ( //Render an error message if the data failed to fetch
                        <div className="flex justify-center items-center">
                            <p className="text-red-500 text-2xl">
                                Failed to fetch workout dates
                            </p>
                        </div>
                    )} */}
                    {/* Render the add workout button if a date is selected */}
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
                                        accessToken={accessToken}
                                        date={clickedDate}
                                        onModalClose={() => setShowModal(false)}
                                    />
                                )}

                                {/* Render the workout for the selected date */}
                                {clickedDate &&
                                    workoutForSelectedDate?.exercises && (
                                        <div className="py-4 general-component flex flex-col text-center justify-center">
                                            {workoutForSelectedDate.exercises.map(
                                                (exercise, index) => {
                                                    const {
                                                        exerciseName,
                                                        sets,
                                                        reps,
                                                        workoutExerciseId,
                                                    } = exercise;
                                                    return (
                                                        <article
                                                            className="grid grid-cols-3 items-center"
                                                            key={
                                                                workoutExerciseId
                                                            }
                                                        >
                                                            <p className="col-start-2">
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
                                                            <span
                                                                className="ml-auto cursor-pointer font-bold mr-10 text-4xl"
                                                                onClick={deleteWorkoutExercise(
                                                                    workoutExerciseId
                                                                )}
                                                            >
                                                                -
                                                            </span>
                                                        </article>
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
        </div>
    );
}
