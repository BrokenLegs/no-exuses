import React from "react";
import WorkoutCalendar from "../components/WorkoutCalendar";
import WorkoutToday from "@/components/WorkoutToday";
import WorkoutWeek from "@/components/WorkoutWeek";

export default function ActivityLog() {
    return (
        <div className=" text-primary-text justify-center items-center grid grid-cols-1 text-center p-6 gap-3">
            <WorkoutCalendar />
            <WorkoutToday />
            <WorkoutWeek />
        </div>
    );
}
