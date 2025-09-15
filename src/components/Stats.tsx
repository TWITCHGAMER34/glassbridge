import React from "react";

interface StatsProps {
    attempts: number;
    time: number; // seconds
}

export const Stats: React.FC<StatsProps> = ({ attempts, time }) => {
    // Format time as mm:ss
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <div className="stats">
            <div>Attempts: {attempts}</div>
            <div>
                Time: {minutes}:{seconds.toString().padStart(2, "0")}
            </div>
        </div>
    );
};

export default Stats;
