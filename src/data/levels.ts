import type { Level, PipeCell } from "@/types/pipe";
import { createEmptyCell, createPipeCell } from "@/utils/pipeUtils";

function createGrid(rows: number, cols: number): PipeCell[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => createEmptyCell()),
  );
}

function randomRotation() {
  const rotations = [0, 90, 180, 270] as const;
  return rotations[Math.floor(Math.random() * 4)];
}

export const LEVELS: Level[] = [
  {
    id: 1,
    name: "新手入门",
    rows: 3,
    cols: 4,
    timeLimit: 60,
    moveLimit: 10,
    difficulty: 1,
    sourcePos: { row: 1, col: 0 },
    targetPositions: [{ row: 1, col: 3 }],
    grid: (() => {
      const g = createGrid(3, 4);
      g[1][0] = createPipeCell("source", randomRotation(), false);
      g[1][1] = createPipeCell("straight", randomRotation());
      g[1][2] = createPipeCell("straight", randomRotation());
      g[1][3] = createPipeCell("target", randomRotation(), false);
      return g;
    })(),
  },
  {
    id: 2,
    name: "初次转弯",
    rows: 3,
    cols: 4,
    timeLimit: 90,
    moveLimit: 15,
    difficulty: 1,
    sourcePos: { row: 0, col: 0 },
    targetPositions: [{ row: 2, col: 3 }],
    grid: (() => {
      const g = createGrid(3, 4);
      g[0][0] = createPipeCell("source", randomRotation(), false);
      g[0][1] = createPipeCell("elbow", randomRotation());
      g[1][1] = createPipeCell("straight", randomRotation());
      g[2][1] = createPipeCell("elbow", randomRotation());
      g[2][2] = createPipeCell("straight", randomRotation());
      g[2][3] = createPipeCell("target", randomRotation(), false);
      return g;
    })(),
  },
  {
    id: 3,
    name: "L型迷宫",
    rows: 4,
    cols: 4,
    timeLimit: 120,
    moveLimit: 20,
    difficulty: 2,
    sourcePos: { row: 0, col: 0 },
    targetPositions: [{ row: 3, col: 3 }],
    grid: (() => {
      const g = createGrid(4, 4);
      g[0][0] = createPipeCell("source", randomRotation(), false);
      g[0][1] = createPipeCell("straight", randomRotation());
      g[0][2] = createPipeCell("elbow", randomRotation());
      g[1][2] = createPipeCell("straight", randomRotation());
      g[2][2] = createPipeCell("elbow", randomRotation());
      g[2][3] = createPipeCell("straight", randomRotation());
      g[3][3] = createPipeCell("target", randomRotation(), false);
      g[1][1] = createPipeCell("elbow", randomRotation());
      g[2][1] = createPipeCell("tee", randomRotation());
      return g;
    })(),
  },
  {
    id: 4,
    name: "双出口",
    rows: 4,
    cols: 5,
    timeLimit: 150,
    moveLimit: 25,
    difficulty: 2,
    sourcePos: { row: 1, col: 0 },
    targetPositions: [
      { row: 0, col: 4 },
      { row: 3, col: 4 },
    ],
    grid: (() => {
      const g = createGrid(4, 5);
      g[1][0] = createPipeCell("source", randomRotation(), false);
      g[1][1] = createPipeCell("straight", randomRotation());
      g[1][2] = createPipeCell("tee", randomRotation());
      g[0][2] = createPipeCell("elbow", randomRotation());
      g[0][3] = createPipeCell("straight", randomRotation());
      g[0][4] = createPipeCell("target", randomRotation(), false);
      g[2][2] = createPipeCell("straight", randomRotation());
      g[3][2] = createPipeCell("elbow", randomRotation());
      g[3][3] = createPipeCell("straight", randomRotation());
      g[3][4] = createPipeCell("target", randomRotation(), false);
      g[1][3] = createPipeCell("cross", randomRotation());
      g[2][3] = createPipeCell("elbow", randomRotation());
      return g;
    })(),
  },
  {
    id: 5,
    name: "复杂网络",
    rows: 5,
    cols: 5,
    timeLimit: 180,
    moveLimit: 35,
    difficulty: 3,
    sourcePos: { row: 2, col: 0 },
    targetPositions: [
      { row: 0, col: 4 },
      { row: 4, col: 4 },
    ],
    grid: (() => {
      const g = createGrid(5, 5);
      g[2][0] = createPipeCell("source", randomRotation(), false);
      g[2][1] = createPipeCell("straight", randomRotation());
      g[2][2] = createPipeCell("cross", randomRotation());
      g[2][3] = createPipeCell("tee", randomRotation());
      g[0][2] = createPipeCell("elbow", randomRotation());
      g[0][3] = createPipeCell("straight", randomRotation());
      g[0][4] = createPipeCell("target", randomRotation(), false);
      g[1][2] = createPipeCell("straight", randomRotation());
      g[4][2] = createPipeCell("elbow", randomRotation());
      g[4][3] = createPipeCell("straight", randomRotation());
      g[4][4] = createPipeCell("target", randomRotation(), false);
      g[3][2] = createPipeCell("straight", randomRotation());
      g[2][4] = createPipeCell("elbow", randomRotation());
      g[1][4] = createPipeCell("straight", randomRotation());
      g[3][4] = createPipeCell("straight", randomRotation());
      g[1][1] = createPipeCell("tee", randomRotation());
      g[3][1] = createPipeCell("tee", randomRotation());
      return g;
    })(),
  },
  {
    id: 6,
    name: "终极挑战",
    rows: 6,
    cols: 6,
    timeLimit: 240,
    moveLimit: 50,
    difficulty: 3,
    sourcePos: { row: 0, col: 0 },
    targetPositions: [
      { row: 0, col: 5 },
      { row: 5, col: 0 },
      { row: 5, col: 5 },
    ],
    grid: (() => {
      const g = createGrid(6, 6);
      g[0][0] = createPipeCell("source", randomRotation(), false);
      g[0][1] = createPipeCell("straight", randomRotation());
      g[0][2] = createPipeCell("cross", randomRotation());
      g[0][3] = createPipeCell("tee", randomRotation());
      g[0][4] = createPipeCell("straight", randomRotation());
      g[0][5] = createPipeCell("target", randomRotation(), false);
      g[1][2] = createPipeCell("straight", randomRotation());
      g[2][2] = createPipeCell("cross", randomRotation());
      g[2][3] = createPipeCell("elbow", randomRotation());
      g[3][2] = createPipeCell("straight", randomRotation());
      g[4][2] = createPipeCell("elbow", randomRotation());
      g[4][1] = createPipeCell("straight", randomRotation());
      g[5][0] = createPipeCell("target", randomRotation(), false);
      g[5][1] = createPipeCell("elbow", randomRotation());
      g[2][4] = createPipeCell("straight", randomRotation());
      g[2][5] = createPipeCell("elbow", randomRotation());
      g[3][5] = createPipeCell("straight", randomRotation());
      g[4][5] = createPipeCell("straight", randomRotation());
      g[5][5] = createPipeCell("target", randomRotation(), false);
      g[5][2] = createPipeCell("tee", randomRotation());
      g[5][3] = createPipeCell("straight", randomRotation());
      g[5][4] = createPipeCell("cross", randomRotation());
      g[4][4] = createPipeCell("elbow", randomRotation());
      g[3][3] = createPipeCell("tee", randomRotation());
      g[1][3] = createPipeCell("straight", randomRotation());
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
