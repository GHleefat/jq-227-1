export type Direction = "top" | "right" | "bottom" | "left";

export type PipeType =
  | "empty"
  | "straight"
  | "elbow"
  | "tee"
  | "cross"
  | "source"
  | "target";

export type Rotation = 0 | 90 | 180 | 270;

export interface PipeCell {
  type: PipeType;
  rotation: Rotation;
  isFixed: boolean;
  hasWater: boolean;
  waterAnimationDelay: number;
}

export interface Position {
  row: number;
  col: number;
}

export interface Level {
  id: number;
  name: string;
  rows: number;
  cols: number;
  timeLimit: number;
  moveLimit: number;
  difficulty: number;
  grid: PipeCell[][];
  sourcePos: Position;
  targetPositions: Position[];
}

export type GameStatus = "idle" | "playing" | "won" | "lost";

export interface GameState {
  currentLevel: number;
  moves: number;
  timeElapsed: number;
  status: GameStatus;
  waterPath: Position[];
  completedLevels: number[];
}

export const DIRECTIONS: Record<Direction, { dr: number; dc: number }> = {
  top: { dr: -1, dc: 0 },
  right: { dr: 0, dc: 1 },
  bottom: { dr: 1, dc: 0 },
  left: { dr: 0, dc: -1 },
};

export const OPPOSITE: Record<Direction, Direction> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

export const PIPE_BASE_CONNECTIONS: Record<PipeType, Direction[]> = {
  empty: [],
  straight: ["top", "bottom"],
  elbow: ["top", "right"],
  tee: ["top", "right", "bottom"],
  cross: ["top", "right", "bottom", "left"],
  source: ["right"],
  target: ["left"],
};
