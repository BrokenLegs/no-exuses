import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/generalStyle.css";

export default function WorkoutToday() {
  const [loading, setLoading] = useState(true); // Add a loading state
  const [fetchFailed, setFetchFailed] = useState(false); // Add a loading state
  const [todaysWorkout, setTodaysWorkout] = useState([]);

  const getTodaysWorkout = async () => {
    try {
      const response = await axios
        .get("https://localhost:7127/api/Users/1/workout/today")
        .then((response) => {
          setTodaysWorkout(response.data.$values);
          setLoading(false);
        });
    } catch (error) {
      setFetchFailed(true);
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getTodaysWorkout();
  }, []);

  return (
    <div className="todays-workout general-component py-6">
      <h2 className="font-bold">Dagens träningspass</h2>
      {/* Loopa igenom alla pass och skriv ut namnen */}
      <div className="text-secondary-text items-center flex justify-center">
        {loading ? (
          <div className="m-auto animate-spin rounded-full h-10 w-10 border-t-2 border-l-2  border-cyan-500"></div>
        ) : (
          <div>
            {fetchFailed ? (
              <div className="text-red-500">Failed to fetch data</div>
            ) : (
              <div>
                {WorkoutToday > 0 ? (
                  <div>
                    {todaysWorkout.map((WorkoutToday) => (
                      <div key={WorkoutToday.name}>{WorkoutToday.name}</div>
                    ))}
                  </div>
                ) : (
                  <div>Du har inget träningspass idag</div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
