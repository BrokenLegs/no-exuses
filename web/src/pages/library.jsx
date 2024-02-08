import React, { useEffect, useState, useRef, useContext } from "react";
import AuthContext from "@/contexts/AuthContext";
import FilterList from "../components/filterList";
import { useGetRequest } from "@/customHooks/useApiHooks";
import ExerciseDetailsModal from "@/components/ExerciseDetailsModal";

export default function library() {
    const { userId, accessToken } = useContext(AuthContext);
    const { sendRequest, isLoading, error, data } = useGetRequest(
        userId,
        accessToken,
        false
    );
    const isFirstRender = useRef(true);
    // Set up state for the lists of filters
    const [muscleGroupList, setMuscleGroupList] = useState([]);
    const [equipmentList, setEquipmentList] = useState([]);
    const [trainingTypeList, setTrainingTypeList] = useState([]);
    const [difficultyList] = useState([
        { name: "beginner" },
        { name: "intermediate" },
    ]);

    const categories = [
        { name: "Difficulty", category: "Difficulty", list: difficultyList },
        {
            name: "Muscle",
            category: "Musclegroups",
            list: muscleGroupList,
        },
        {
            name: "Type",
            category: "Trainingtypes",
            list: trainingTypeList,
        },
        { name: "Equipment", category: "Tools", list: equipmentList },
    ];

    const [searchFilter, setSearchFilter] = useState([]);

    const [exerciseList, setExerciseList] = useState([]);

    const [activeFilterCategory, setActiveFilterCategory] = useState("");

    const [selectedExerciseId, setSelectedExerciseId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch data based on category
    const getList = async (category) => {
        try {
            const response = await sendRequest(
                `https://localhost:7127/api/${category}`
            );
            return response.$values;
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    useEffect(() => {
        categories.forEach((category) => {
            // We dont need to fetch difficulty category as it is already hardcoded
            if (category.category === "Difficulty") return;
            getList(category.category).then((data) => {
                switch (category.category) {
                    case "Musclegroups":
                        setMuscleGroupList(data);
                        break;
                    case "Tools":
                        setEquipmentList(data);
                        break;
                    case "Trainingtypes":
                        setTrainingTypeList(data);
                        break;
                    case "Difficulty":
                        break;
                    default:
                        console.log("Unknown category:", category);
                }
            });
        });
    }, []);

    useEffect(() => {
        // Don't run this useEffect on first render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        // Create a query string from the searchFilter
        const queryString = searchFilter
            .map((filter) => `keywords=${filter}`)
            .join("&");

        // Fetch all exercises that match the searchFilter
        const response = sendRequest(
            `https://localhost:7127/api/exercises/search?${queryString}`
        ).then((response) => {
            let sortedResponse = [...response.$values].sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            setExerciseList(sortedResponse);
        });
    }, [searchFilter]); // Run this useEffect every time searchFilter changes

    function addFilter(filter) {
        setSearchFilter((prevSearchFilter) => {
            if (prevSearchFilter.includes(filter)) {
                // Remove the filter from the searchFilter
                return prevSearchFilter.filter((item) => item !== filter);
            } else {
                // Add the filter to the searchFilter
                return [...prevSearchFilter, filter];
            }
        });
    }
    useEffect(() => {
        setActiveFilterCategory("");
    }, [searchFilter]);

    return (
        <>
            {/* Main container */}
            <main className="w-full text-primary-text flex flex-col gap-y-8 text-center p-6 ">
                {/* List of active filters */}
                <div className="active-filters absolute right-0 bg-black bg-opacity-20 m-4 rounded border-component-border-black border-y-2 shadow-md">
                    {searchFilter.map((filter) => (
                        <ul className="" key={filter}>
                            <li className="flex gap-x-3">
                                <p className="pl-2">{filter}</p>
                                <p
                                    className="active-filter-remove right cursor-pointer font-bold ml-auto pr-2"
                                    onClick={() => addFilter(filter)}
                                >
                                    -
                                </p>
                            </li>
                        </ul>
                    ))}
                </div>
                {/* Search bar */}
                <search>
                    <input
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                addFilter(e.target.value);
                                e.target.value = "";
                                e.preventDefault(); // Prevent form submission
                            }
                        }}
                        type="text"
                        name=""
                        id=""
                        className="general-component px-4 min-h-20 w-full"
                        placeholder="Search for an exercise"
                    />
                </search>

                {/* Search filters */}
                <fieldset>
                    <div className="relative">
                        <legend className="absolute bottom-0 font-bold text-sm text-left flex">
                            Filters
                            {/* <span
                                className={`px-2 cursor-pointer mx-auto relative rounded-md border-component-border-black border-y-2 shadow-md  ${
                                    searchFilter.includes("all")
                                        ? "bg-component-active  text-secondary-text "
                                        : "bg-component-background"
                                } `}
                                onClick={() => addFilter("all")}
                            >
                                All Exercises
                            </span> */}
                        </legend>
                    </div>
                    <div className="filters-container grid grid-cols-1">
                        <section className="flex gap-2">
                            {categories.map(({ name, list }) => (
                                <div
                                    className={`general-component cursor-pointer flex-1 pt-1`}
                                    key={name}
                                >
                                    <div
                                        className="filter-categories mt-2 font-bold"
                                        onClick={() =>
                                            activeFilterCategory === name
                                                ? setActiveFilterCategory("")
                                                : setActiveFilterCategory(name)
                                        }
                                    >
                                        <h3>{name}</h3>
                                    </div>
                                    <div
                                        className={`flex flex-wrap justify-center sub-filters gap-2 mb-4 px-2  ${
                                            activeFilterCategory === name
                                                ? "visible-transition"
                                                : "hidden-transition"
                                        }`}
                                    >
                                        <FilterList
                                            key={name}
                                            list={list}
                                            category={name}
                                            addFilter={addFilter}
                                            searchFilter={searchFilter}
                                        />
                                    </div>
                                </div>
                            ))}
                        </section>

                        <fieldset className="grid grid-cols-4 gap-2 mt-4">
                            <legend className="font-bold text-sm text-left ">
                                Exercises
                            </legend>
                            {/* List of exercises */}
                            {searchFilter &&
                                exerciseList &&
                                exerciseList.map(({ exerciseId, name }) => (
                                    <button
                                        className="px-4 py-2 rounded general-component bg-background-4"
                                        key={exerciseId}
                                        onClick={() => {
                                            setSelectedExerciseId(exerciseId);
                                            setIsModalOpen(true); // Set the selected exercise ID
                                        }}
                                    >
                                        {name}
                                    </button>
                                ))}
                            {/* Exercise details */}
                            {selectedExerciseId &&
                                isModalOpen && ( // Only render the ExerciseDetailsModal component if an exercise is selected
                                    <ExerciseDetailsModal
                                        onClose={() => setIsModalOpen(false)}
                                        exerciseId={selectedExerciseId}
                                    />
                                )}
                        </fieldset>
                    </div>
                </fieldset>
            </main>
        </>
    );
}
