import React, { useState, useEffect } from "react";
import useSessionUserIdMatch from "@/customHooks/useSessionUserIdMatch";
import { usePostRequest, useGetRequest } from "@/customHooks/useApiHooks";
import { list } from "postcss";
// import { AuthContext } from "@/context/AuthContext";

export default function AddWorkoutModal({
    userId,
    accessToken,
    date,
    onModalClose,
}) {
    const [listOfExercises, setListOfExercises] = useState([]);

    const [usedSearch, setUsedSearch] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");

    const [isSuccess, setIsSuccess] = useState(false);

    const {
        sendRequest: sendPostRequest,
        isLoading: isPostLoading,
        error: postError,
    } = usePostRequest(userId, accessToken);
    const {
        sendRequest: sendGetRequest,
        isLoading: isGetLoading,
        error: getError,
        data,
    } = useGetRequest(userId, accessToken);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const isUserIdMatch = useSessionUserIdMatch(userId);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const url = `https://localhost:7127/api/Users/${userId}/workout/20mostFrequent`;
                const response = await sendGetRequest(url);
                const exercises = response.$values.map((item) => item.exercise);
                setListOfExercises(exercises);
            } catch (error) {
                console.error("Error fetching exercises:", error);
            }
        };
        fetchExercises();
    }, [accessToken]);

    // Handle error state
    if (getError || postError) {
        return (
            <div>Error occurred: {getError?.message || postError?.message}</div>
        );
    }

    function validateExercise() {
        if (userId === 0) {
            alert("Du måste logga in för att lägga till ett träningspass");
            return null;
        }
        if (selectedExercise === "") {
            alert("Du måste välja en övning");
            return null;
        }

        let validatedSets = sets;
        let validatedReps = reps;

        if (sets === "") {
            validatedSets = 0;
        }
        if (reps === "") {
            validatedReps = 0;
        }

        return { validatedSets, validatedReps };
    }

    const handleSubmit = async (event) => {
        setIsSubmitting(true);

        const validatedValues = validateExercise();
        if (!validatedValues) return;
        if (!isUserIdMatch) return; //Check if the userId in the session is the same as the userId in the api request
        try {
            const response = await sendPostRequest(
                "https://localhost:7127/api/Workouts",
                {
                    UserId: userId,
                    Date: date,
                    Sets: validatedValues.validatedSets,
                    Reps: validatedValues.validatedReps,
                    ExerciseName: selectedExercise,
                    accessToken: accessToken,
                }
            );
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                onModalClose(false);
            }, 1500);
        } catch (error) {
            setIsSubmitting(false);
            console.error("Error adding workout:", error);
        }
    };

    const fetchExerciseswithSearch = async (search) => {
        try {
            const url = `https://localhost:7127/api/Exercises/Search?keywords=${search}`;
            const response = await sendGetRequest(url);
            setListOfExercises(response.$values);
            console.log("Exercises fetched:", response.$values);
            setUsedSearch(true);
        } catch (error) {
            console.error("Error fetching exercises:", error);
        }
    };

    return (
        <div
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onModalClose(false);
                }
            }}
            className="fixed text-2xl top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 backdrop-blur-md max-w-3xl mx-auto "
        >
            {isSuccess && (
                <div className="success-message absolute top-10 left-1/2 transform -translate-x-1/2  bg-green-500 text-white p-10 text-3xl rounded-md ">
                    Träningspasset tillagt!
                </div>
            )}

            <div className="modal-container overflow-y-auto max-h-dvh py-20 flex flex-col p-8 fixed min-w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-background-3 rounded-md">
                <button
                    className="absolute top-4 right-4 text-2xl font-bold z-50"
                    onClick={() => onModalClose(false)}
                >
                    X
                </button>
                <search className="px-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className=" p-2 rounded mt-1 w-full bg-white"
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                setSelectedExercise("");
                                fetchExerciseswithSearch(event.target.value);
                                event.preventDefault();
                                // Call your search function here
                            }
                        }}
                    />
                </search>
                <fieldset>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleSubmit(event);
                            event.stopPropagation();
                        }}
                        className="flex flex-col z-50 p-4 "
                    >
                        <legend className="text-center relative pb-4">
                            {!selectedExercise &&
                                !usedSearch &&
                                "Your 20 most frequently used exercises:"}
                            {usedSearch &&
                                !selectedExercise &&
                                "Results from search:"}
                            {selectedExercise && (
                                <>
                                    {selectedExercise}
                                    <span
                                        className="font-bold text-3xl absolute right-0 cursor-pointer mr-12"
                                        onClick={() => setSelectedExercise("")}
                                    >
                                        -
                                    </span>
                                </>
                            )}
                        </legend>

                        {!selectedExercise && isGetLoading && (
                            <div className="loader">Loading..</div>
                        )}
                        <label className="mb-2 grid grid-cols-5 gap-2">
                            {listOfExercises &&
                                !selectedExercise &&
                                listOfExercises.map((exercise) => (
                                    <div
                                        className={` ${
                                            selectedExercise === exercise.name
                                                ? "bg-component-active rounded-md "
                                                : "general-component"
                                        }`}
                                        key={exercise.exerciseId}
                                        value={exercise.id}
                                        onClick={() => {
                                            setSelectedExercise(exercise.name);
                                        }}
                                    >
                                        {exercise.name}
                                    </div>
                                ))}
                        </label>
                        <label className="mb-2">
                            <input
                                type="number"
                                placeholder="Sets / Km"
                                value={sets}
                                onChange={(e) => setSets(e.target.value)}
                                className="p-2 rounded mt-1 w-full"
                            />
                        </label>
                        <label className="mb-2">
                            <input
                                type="number"
                                placeholder="Reps / Min"
                                value={reps}
                                onChange={(e) => setReps(e.target.value)}
                                className="p-2 rounded mt-1 w-full"
                            />
                        </label>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            onClick={(event) => event.stopPropagation()}
                            className="add-button mt-4"
                        >
                            Lägg till träningspass
                        </button>
                    </form>
                </fieldset>
            </div>
        </div>
    );
}
