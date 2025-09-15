type TileType = "safe" | "danger";

interface LastClicked {
    row: number;
    col: number;
    correct: boolean;
}

interface BridgeComponentProps {
    bridge: TileType[][];
    currentRow: number;
    onTileClick: (row: number, col: number) => void;
    lastClicked?: LastClicked;
}

export default function Bridge({bridge, currentRow, onTileClick, lastClicked,}: BridgeComponentProps) {
    return (
        <div className="bridge">
            {bridge.map((row, rowIdx) => (
                <div className="bridge-row" key={rowIdx}>
                    {row.map((_, colIdx) => {
                        let className = "bridge-tile";
                        if (
                            lastClicked &&
                            lastClicked.row === rowIdx &&
                            lastClicked.col === colIdx
                        ) {
                            className += lastClicked.correct ? " correct" : " incorrect";
                        }
                        return (
                            <button
                                key={colIdx}
                                className={className}
                                disabled={rowIdx !== currentRow}
                                onClick={() => onTileClick(rowIdx, colIdx)}
                            >
                                {rowIdx === currentRow ? "?" : ""}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
