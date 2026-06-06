import type { Level, PipeCell, PipeType, Rotation } from "@/types/pipe";
import { createEmptyCell, createPipeCell } from "@/utils/pipeUtils";

function createGrid(rows: number, cols: number): PipeCell[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => createEmptyCell()),
  );
}

function randomRotation(): Rotation {
  const rotations: Rotation[] = [0, 90, 180, 270];
  return rotations[Math.floor(Math.random() * 4)];
}

function placeCell(
  grid: PipeCell[][],
  row: number,
  col: number,
  type: PipeType,
  isFixed = false,
) {
  grid[row][col] = createPipeCell(type, randomRotation(), isFixed);
}

export const LEVELS: Level[] = [
  {
    id: 1,
    name: "新手入门",
    rows: 3,
    cols: 4,
    timeLimit: 60,
    moveLimit: 15,
    difficulty: 1,
    sourcePos: { row: 1, col: 0 },
    targetPositions: [{ row: 1, col: 3 }],
    grid: (() => {
      const g = createGrid(3, 4);
      placeCell(g, 1, 0, "source");
      placeCell(g, 1, 1, "straight");
      placeCell(g, 1, 2, "straight");
      placeCell(g, 1, 3, "target");
      return g;
    })(),
  },
  {
    id: 2,
    name: "初次转弯",
    rows: 3,
    cols: 4,
    timeLimit: 90,
    moveLimit: 20,
    difficulty: 1,
    sourcePos: { row: 0, col: 0 },
    targetPositions: [{ row: 2, col: 3 }],
    grid: (() => {
      const g = createGrid(3, 4);
      placeCell(g, 0, 0, "source");
      placeCell(g, 0, 1, "elbow");
      placeCell(g, 1, 1, "straight");
      placeCell(g, 2, 1, "elbow");
      placeCell(g, 2, 2, "straight");
      placeCell(g, 2, 3, "target");
      return g;
    })(),
  },
  {
    id: 3,
    name: "L型迷宫",
    rows: 4,
    cols: 4,
    timeLimit: 120,
    moveLimit: 25,
    difficulty: 2,
    sourcePos: { row: 0, col: 0 },
    targetPositions: [{ row: 3, col: 3 }],
    grid: (() => {
      const g = createGrid(4, 4);
      placeCell(g, 0, 0, "source");
      placeCell(g, 0, 1, "straight");
      placeCell(g, 0, 2, "elbow");
      placeCell(g, 1, 2, "straight");
      placeCell(g, 2, 2, "elbow");
      placeCell(g, 2, 3, "straight");
      placeCell(g, 3, 3, "target");
      placeCell(g, 1, 1, "elbow");
      placeCell(g, 2, 1, "tee");
      placeCell(g, 1, 0, "elbow");
      return g;
    })(),
  },
  {
    id: 4,
    name: "双出口",
    rows: 4,
    cols: 5,
    timeLimit: 150,
    moveLimit: 30,
    difficulty: 2,
    sourcePos: { row: 1, col: 0 },
    targetPositions: [
      { row: 0, col: 4 },
      { row: 3, col: 4 },
    ],
    grid: (() => {
      const g = createGrid(4, 5);
      placeCell(g, 1, 0, "source");
      placeCell(g, 1, 1, "straight");
      placeCell(g, 1, 2, "tee");
      placeCell(g, 0, 2, "elbow");
      placeCell(g, 0, 3, "straight");
      placeCell(g, 0, 4, "target");
      placeCell(g, 2, 2, "straight");
      placeCell(g, 3, 2, "elbow");
      placeCell(g, 3, 3, "straight");
      placeCell(g, 3, 4, "target");
      placeCell(g, 1, 3, "cross");
      placeCell(g, 2, 3, "elbow");
      placeCell(g, 2, 4, "straight");
      return g;
    })(),
  },
  {
    id: 5,
    name: "复杂网络",
    rows: 5,
    cols: 5,
    timeLimit: 180,
    moveLimit: 40,
    difficulty: 3,
    sourcePos: { row: 2, col: 0 },
    targetPositions: [
      { row: 0, col: 4 },
      { row: 4, col: 4 },
    ],
    grid: (() => {
      const g = createGrid(5, 5);
      placeCell(g, 2, 0, "source");
      placeCell(g, 2, 1, "straight");
      placeCell(g, 2, 2, "cross");
      placeCell(g, 2, 3, "tee");
      placeCell(g, 0, 2, "elbow");
      placeCell(g, 0, 3, "straight");
      placeCell(g, 0, 4, "target");
      placeCell(g, 1, 2, "straight");
      placeCell(g, 4, 2, "elbow");
      placeCell(g, 4, 3, "straight");
      placeCell(g, 4, 4, "target");
      placeCell(g, 3, 2, "straight");
      placeCell(g, 2, 4, "elbow");
      placeCell(g, 1, 4, "straight");
      placeCell(g, 3, 4, "straight");
      placeCell(g, 1, 1, "tee");
      placeCell(g, 3, 1, "tee");
      placeCell(g, 1, 3, "elbow");
      placeCell(g, 3, 3, "elbow");
      return g;
    })(),
  },
  {
    id: 6,
    name: "终极挑战",
    rows: 6,
    cols: 6,
    timeLimit: 240,
    moveLimit: 60,
    difficulty: 3,
    sourcePos: { row: 0, col: 0 },
    targetPositions: [
      { row: 0, col: 5 },
      { row: 5, col: 0 },
      { row: 5, col: 5 },
    ],
    grid: (() => {
      const g = createGrid(6, 6);
      placeCell(g, 0, 0, "source");
      placeCell(g, 0, 1, "straight");
      placeCell(g, 0, 2, "cross");
      placeCell(g, 0, 3, "straight");
      placeCell(g, 0, 4, "straight");
      placeCell(g, 0, 5, "target");
      placeCell(g, 1, 2, "straight");
      placeCell(g, 2, 2, "cross");
      placeCell(g, 2, 3, "tee");
      placeCell(g, 3, 2, "straight");
      placeCell(g, 4, 2, "elbow");
      placeCell(g, 4, 1, "straight");
      placeCell(g, 5, 0, "target");
      placeCell(g, 5, 1, "elbow");
      placeCell(g, 2, 4, "straight");
      placeCell(g, 2, 5, "elbow");
      placeCell(g, 3, 5, "straight");
      placeCell(g, 4, 5, "straight");
      placeCell(g, 5, 5, "target");
      placeCell(g, 5, 2, "tee");
      placeCell(g, 5, 3, "straight");
      placeCell(g, 5, 4, "cross");
      placeCell(g, 4, 4, "elbow");
      placeCell(g, 3, 3, "cross");
      placeCell(g, 1, 3, "straight");
      placeCell(g, 1, 4, "elbow");
      placeCell(g, 1, 5, "straight");
      return g;
    })(),
  },
];

export function getLevelById(id: number): Level | undefined {
  const level = LEVELS.find((l) => l.id === id);
  if (!level) return undefined;
  return {
    ...level,
    grid: level.grid.map((row) => row.map((cell) => ({ ...cell }))),
    targetPositions: level.targetPositions.map((p) => ({ ...p })),
    sourcePos: { ...level.sourcePos },
  };
}
