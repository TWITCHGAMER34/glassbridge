// src/utils/bridgeGenerator.ts

export type TileType = "safe" | "danger";

/**
 * Generates a bridge for the Glass Bridge Game.
 * Each row has one 'safe' and one 'danger' tile, randomly placed.
 * @param rows Number of rows in the bridge (default: 10)
 * @param cols Number of tiles per row (default: 2)
 * @returns TileType[][]
 */
export function generateBridge(rows: number = 10, cols: number = 2): TileType[][] {
    return Array.from({ length: rows }, () => {
        const safeIdx = Math.floor(Math.random() * cols);
        return Array.from({ length: cols }, (_, i) => (i === safeIdx ? "safe" : "danger"));
    });
}
