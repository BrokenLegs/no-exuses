import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import WorkoutCalendar from "../components/WorkoutCalendar";
import WorkoutToday from "@/components/WorkoutToday";
import WorkoutWeek from "@/components/WorkoutWeek";

export default function ActivityLog() {
    return (
        <div className="mx-auto text-primary-text justify-center grid grid-cols-1 text-center p-6 gap-3 max-w-full">
            <WorkoutCalendar />
            {/* <WorkoutToday userId={userId} /> */}
            <WorkoutWeek />
        </div>
    );
}
