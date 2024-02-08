import React, { useState, useEffect, useContext } from "react";
import { useGetRequest } from "@/customHooks/useApiHooks";
import AuthContext from "@/contexts/AuthContext";

export default function ({ onClose, exerciseId }) {
    const { accessToken, userId } = useContext(AuthContext);
    const [exercise, setExercise] = useState({});
    const { sendRequest, isLoading, error, data } = useGetRequest(
        userId,
        accessToken,
        false
    );

    const getExerciseDetails = async () => {
        try {
            const data = await sendRequest(
                `https://localhost:7127/api/exercises/${exerciseId}`
            );
            if (data) {
                setExercise(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getExerciseDetails(exerciseId);
    }, [exerciseId]);

    return (
        <>
            {exercise.name && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 "
                    onClick={onClose}
                >
                    <div className="fixed inset-0 bg-black opacity-50 backdrop-blur-md"></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg overflow-auto max-h-screen max-w-3xl mx-auto z-10 grid grid-cols-4 grid-flow-row gap-y-2">
                        <article className="col-span-full ">
                            <h3 className="text-2xl font-bold text-center ">
                                {exercise.name[0].toUpperCase() +
                                    exercise.name.slice(1)}
                            </h3>
                        </article>
                        {exercise.muscleGroups && (
                            <article>
                                <h3 className="text-lg font-semibold mt-4">
                                    Muscle
                                </h3>
                                <ul className="list-disc list-inside">
                                    {exercise &&
                                        exercise.muscleGroups.map(
                                            (muscle, index) => (
                                                <li
                                                    key={index}
                                                    className="text-secondary-text"
                                                >
                                                    {muscle[0].toUpperCase() +
                                                        muscle.slice(1)}
                                                </li>
                                            )
                                        )}
                                </ul>
                            </article>
                        )}

                        {exercise.requiredTools && (
                            <article>
                                <h3 className="text-lg font-semibold mt-4">
                                    Equipment
                                </h3>
                                <ul className="list-disc list-inside">
                                    {exercise &&
                                        exercise.requiredTools.map(
                                            (tool, index) => (
                                                <li
                                                    key={index}
                                                    className="text-secondary-text"
                                                >
                                                    {tool[0].toUpperCase() +
                                                        tool.slice(1)}
                                                </li>
                                            )
                                        )}
                                </ul>
                            </article>
                        )}
                        {exercise.trainingTypes && (
                            <article>
                                <h3 className="text-lg font-semibold mt-4">
                                    Type
                                </h3>
                                <ul className="list-disc list-inside">
                                    {exercise &&
                                        exercise.trainingTypes.map(
                                            (type, index) => (
                                                <li
                                                    key={index}
                                                    className="text-secondary-text"
                                                >
                                                    {type[0].toUpperCase() +
                                                        type.slice(1)}
                                                </li>
                                            )
                                        )}
                                </ul>
                            </article>
                        )}
                        <article>
                            <h3 className="text-lg font-semibold mt-4">
                                Difficulty
                            </h3>
                            <p className="text-secondary-text">
                                {exercise.difficulty[0].toUpperCase() +
                                    exercise.difficulty.slice(1)}
                            </p>
                        </article>
                        <article className="col-span-full">
                            <h3 className="text-lg font-semibold mt-4">
                                Instructions
                            </h3>
                            <p className="text-secondary-text leading-normal">
                                {exercise.instructions}
                            </p>
                        </article>
                    </div>
                </div>
            )}
        </>
    );
}
