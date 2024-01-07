import React, { useEffect, useState, useRef } from "react";
import FilterList from "../components/filterList";
import axios from "axios";

export default function library() {
  const isFirstRender = useRef(true);

  const [muscleGroupList, setMuscleGroupList] = useState([]);
  const [venueList, setVenueList] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [trainingTypeList, setTrainingTypeList] = useState([]);

  const [searchFilter, setSearchFilter] = useState([]);

  const [exerciseList, setExerciseList] = useState([]);

  const [activeFilterCategory, setActiveFilterCategory] = useState("");

  const categories = ["Trainingtypes", "Musclegroups", "Venues", "Tools"]; //REMOVED "Trainingtypes"

  // Function to fetch data based on category
  const getList = async (category) => {
    try {
      const response = await axios.get(
        `https://localhost:7127/api/${category}`
      );
      return response.data.$values;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    categories.forEach((category) => {
      getList(category).then((data) => {
        switch (category) {
          case "Musclegroups":
            setMuscleGroupList(data);
            break;
          case "Venues":
            setVenueList(data);
            break;
          case "Tools":
            setEquipmentList(data);
            break;
          case "Trainingtypes":
            setTrainingTypeList(data);
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
    // Fetch all exercises that match the searchFilter
    const queryString = searchFilter
      .map((filter) => `keywords=${filter}`)
      .join("&");
    axios
      .get(`https://localhost:7127/api/exercises/search?${queryString}`)
      .then((response) => {
        setExerciseList(response.data.$values);
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

  // Function to handle category click

  return (
    <>
      {/* List of active filters */}
      {/* Main container */}
      <div className="relative text-primary-text justify-center items-center grid grid-cols-1 text-center p-6 gap-3">
        <div className="active-filters absolute top-0 right-0 bg-black bg-opacity-20 m-4 rounded border-component-border-black border-y-2 shadow-md">
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
        {/* Search bar, filter after every keystroke  */}
        <input
          type="text"
          name=""
          id=""
          className="general-component p-4 "
          placeholder="Search for an exercise"
        />
        {/* Different filters */}
        <h3 className="font-bold text-sm text-left">Filters</h3>
        <div className="filters-container grid grid-cols-1 gap-4 ">
          {categories.map((category) => (
            <div
              className={`general-component py-4 cursor-pointer`}
              key={category}
            >
              <div
                className=" font-bold"
                onClick={() =>
                  activeFilterCategory == category
                    ? setActiveFilterCategory("")
                    : setActiveFilterCategory(category)
                }
              >
                <h3>{category}</h3>
              </div>
              <div
                className={`sub-filters ${
                  activeFilterCategory === category
                    ? "visible-transition"
                    : "hidden-transition"
                }`}
              >
                {category === "Musclegroups" && (
                  <FilterList
                    list={muscleGroupList}
                    category={category}
                    addFilter={addFilter}
                    searchFilter={searchFilter}
                  />
                )}
                {category === "Venues" && (
                  <FilterList
                    list={venueList}
                    category={category}
                    addFilter={addFilter}
                    searchFilter={searchFilter}
                  />
                )}
                {category === "Tools" && (
                  <FilterList
                    list={equipmentList}
                    category={category}
                    addFilter={addFilter}
                    searchFilter={searchFilter}
                  />
                )}
                {category === "Trainingtypes" && (
                  <FilterList
                    list={trainingTypeList}
                    category={category}
                    addFilter={addFilter}
                    searchFilter={searchFilter}
                  />
                )}
              </div>
            </div>
          ))}

          <h3 className="font-bold text-sm text-left">
            Exercises
            <span
              className={`px-2 cursor-pointer absolute left-1/2 transform -translate-x-1/2 rounded-md border-component-border-black border-y-2 shadow-md  ${
                searchFilter.includes("all")
                  ? "bg-component-active  text-secondary-text "
                  : "bg-component-background"
              } `}
              onClick={() => addFilter("all")}
            >
              All Exercises
            </span>
          </h3>
          {/* List of exercises */}
          <div className="general-component">
            {searchFilter &&
              exerciseList.map((exercise, index) => (
                <p key={index + " " + exercise}>{exercise}</p>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
