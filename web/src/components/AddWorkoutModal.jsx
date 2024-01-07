import { useState, useEffect } from "react";
import axios from "axios";

export default function AddWorkoutModal({ userId, date, onModalClose }) {
    const [listOfExercises, setListOfExercises] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");

    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await axios.get(
                    "https://localhost:7127/api/Exercises"
                );
                setListOfExercises(response.data.$values);
            } catch (error) {
                console.error("Error fetching exercises:", error);
            }
        };

        fetchExercises();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "https://localhost:7127/api/Workouts",
                {
                    UserId: userId,
                    Date: date,
                    Sets: sets,
                    Reps: reps,
                    ExerciseName: selectedExercise,
                }
            );
            setIsSuccess(true); // Set success to true
            setTimeout(() => {
                setIsSuccess(false);
                onModalClose(false); // Close the modal after the success message has been displayed
                window.location.reload();
            }, 1500);
        } catch (error) {
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
            className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 backdrop-blur-md "
        >
            {isSuccess && (
                <div className="success-message absolute top-10 left-1/2 transform -translate-x-1/2  bg-green-500 text-white p-10 text-3xl rounded-md ">
                    Träningspass tillagd!
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
                            {listOfExercises.map((exercise) => (
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
