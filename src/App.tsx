import {useState, useEffect} from "react";
import {generateBridge} from "./utils/bridgeGenerator";
import type {TileType} from "./utils/bridgeGenerator";
import Bridge from "./components/Bridge";
import Stats from "./components/Stats";
import GameOverModal from "./components/GameOverModal";
import "./App.css";

export default function App() {
    const [bridge, setBridge] = useState<TileType[][]>(() => generateBridge());
    const [currentRow, setCurrentRow] = useState(0);
    const [attempts, setAttempts] = useState(1);
    const [time, setTime] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [lastClicked, setLastClicked] = useState<{
        row: number,
        col: number,
        correct: boolean
    } | undefined>(undefined);

    // Timer effect
    useEffect(() => {
        if (gameOver) return;
        const timer = setInterval(() => setTime((t) => t + 1), 1000);
        return () => clearInterval(timer);
    }, [gameOver]);

    // Handle tile click
    function handleTileClick(row: number, col: number) {
        if (gameOver || row !== currentRow) return;
        const correct = bridge[row][col] === "safe";
        setLastClicked({row, col, correct});
        if (correct) {
            if (row === bridge.length - 1) {
                setGameOver(true);
            } else {
                setCurrentRow(row + 1);
            }
        } else {
            setTimeout(() => {
                setCurrentRow(0);
                setAttempts((a) => a + 1);
                setTime(0);
                setLastClicked(undefined);
            }, 600); // Show red for 600ms before reset
        }
    }

    // Restart game
    function handleRestart() {
        setBridge(generateBridge());
        setCurrentRow(0);
        setAttempts(1);
        setTime(0);
        setGameOver(false);
    }

    return (
        <div className="app">
            <h1>Glass Bridge Game</h1>
            <Stats attempts={attempts} time={time}/>
            <Bridge
                bridge={bridge}
                currentRow={currentRow}
                onTileClick={handleTileClick}
                lastClicked={lastClicked}
            />
            {gameOver && (
                <GameOverModal
                    attempts={attempts}
                    time={time}
                    onRestart={handleRestart}
                />
            )}
        </div>
    );
}
