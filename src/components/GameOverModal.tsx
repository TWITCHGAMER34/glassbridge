import React from "react";

interface GameOverModalProps {
    attempts: number;
    time: number; // seconds
    onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
                                                                attempts,
                                                                time,
                                                                onRestart,
                                                            }) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <div className="gameover-modal">
            <div className="modal-content">
                <h2>You Win!</h2>
                <div>Attempts: {attempts}</div>
                <div>
                    Time: {minutes}:{seconds.toString().padStart(2, "0")}
                </div>
                <button onClick={onRestart}>Play Again</button>
            </div>
        </div>
    );
};

export default GameOverModal;
