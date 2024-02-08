import React, { useState, useEffect } from "react";
import useSessionUserIdMatch from "@/customHooks/useSessionUserIdMatch";
import { usePostRequest, useGetRequest } from "@/customHooks/useApiHooks";
// import { AuthContext } from "@/context/AuthContext";

export default function AddWorkoutModal({
    userId,
    accessToken,
    date,
    onModalClose,
}) {
    const [listOfExercises, setListOfExercises] = useState([]);
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
                const url = "https://localhost:7127/api/Exercises";
                const response = await sendGetRequest(url);
                setListOfExercises(response.$values);
                console.log("Exercises fetched:", response.$values);
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
        event.preventDefault();
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

    return (
        <div
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onModalClose(false);
                }
            }}
            className="fixed text-2xl top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 backdrop-blur-md "
        >
            {isSuccess && (
                <div className="success-message absolute top-10 left-1/2 transform -translate-x-1/2  bg-green-500 text-white p-10 text-3xl rounded-md ">
                    Träningspasset tillagt!
                </div>
            )}

            <div className="modal-container p-8 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 min-h-80 min-w-80 bg-background-3 rounded-md">
                <button
                    className="absolute top-4 right-4 text-2xl font-bold z-50"
                    onClick={() => onModalClose(false)}
                >
                    X
                </button>
                <form
                    onSubmit={(event) => handleSubmit(event)}
                    className="flex flex-col z-50 p-4"
                >
                    <label className="mb-2">
                        <select
                            value={selectedExercise}
                            onChange={(e) =>
                                setSelectedExercise(e.target.value)
                            }
                            className="p-2 rounded mt-1 w-full bg-white "
                        >
                            <option value="" disabled>
                                Övning
                            </option>
                            {listOfExercises &&
                                listOfExercises.map((exercise) => (
                                    <option
                                        key={exercise.exerciseId}
                                        value={exercise.id}
                                    >
                                        {exercise.name}
                                    </option>
                                ))}
                        </select>
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
                        // className="bg-blue-500 text-white p-2 rounded mt-4"
                        className="add-button mt-4"
                    >
                        Lägg till träningspass
                    </button>
                </form>
            </div>
        </div>
    );
}
