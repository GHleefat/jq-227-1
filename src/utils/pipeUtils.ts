import type {
  Direction,
  PipeCell,
  PipeType,
  Position,
  Rotation,
} from "@/types/pipe";
import { DIRECTIONS, OPPOSITE, PIPE_BASE_CONNECTIONS } from "@/types/pipe";

const DIRECTION_ORDER: Direction[] = ["top", "right", "bottom", "left"];

export function rotateDirection(dir: Direction, rotation: Rotation): Direction {
  const steps = rotation / 90;
  const currentIndex = DIRECTION_ORDER.indexOf(dir);
  const newIndex = (currentIndex + steps) % 4;
  return DIRECTION_ORDER[newIndex];
}

export function getPipeConnections(pipe: PipeCell): Direction[] {
  const baseConnections = PIPE_BASE_CONNECTIONS[pipe.type];
  return baseConnections.map((dir) => rotateDirection(dir, pipe.rotation));
}

export function rotatePipe(pipe: PipeCell): PipeCell {
  if (pipe.type === "empty") return pipe;
  const rotations: Rotation[] = [0, 90, 180, 270];
  const currentIndex = rotations.indexOf(pipe.rotation);
  const nextIndex = (currentIndex + 1) % 4;
  return {
    ...pipe,
    rotation: rotations[nextIndex],
  };
}

export function cloneGrid(grid: PipeCell[][]): PipeCell[][] {
  return grid.map((row) => row.map((cell) => ({ ...cell })));
}

export function clearWater(grid: PipeCell[][]): PipeCell[][] {
  return grid.map((row) =>
    row.map((cell) => ({
      ...cell,
      hasWater: false,
      waterAnimationDelay: 0,
    })),
  );
}

export interface BFSResult {
  waterPath: Position[];
  allTargetsReached: boolean;
  visitedCount: number;
}

export function bfsWaterFlow(
  grid: PipeCell[][],
  sourcePos: Position,
  targetPositions: Position[],
): BFSResult {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set<string>();
  const waterPath: Position[] = [];
  const queue: { pos: Position; step: number }[] = [];

  const posKey = (p: Position) => `${p.row},${p.col}`;

  queue.push({ pos: sourcePos, step: 0 });
  visited.add(posKey(sourcePos));
  waterPath.push(sourcePos);

  while (queue.length > 0) {
    const { pos, step } = queue.shift()!;
    const currentPipe = grid[pos.row][pos.col];
    const connections = getPipeConnections(currentPipe);

    for (const dir of connections) {
      const { dr, dc } = DIRECTIONS[dir];
      const newRow = pos.row + dr;
      const newCol = pos.col + dc;
      const newPos: Position = { row: newRow, col: newCol };
      const newKey = posKey(newPos);

      if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
        continue;
      }

      if (visited.has(newKey)) continue;

      const nextPipe = grid[newRow][newCol];
      if (nextPipe.type === "empty") continue;

      const nextConnections = getPipeConnections(nextPipe);
      const neededConnection = OPPOSITE[dir];

      if (nextConnections.includes(neededConnection)) {
        visited.add(newKey);
        waterPath.push(newPos);
        queue.push({ pos: newPos, step: step + 1 });
      }
    }
  }

  const allTargetsReached = targetPositions.every((tp) =>
    waterPath.some((wp) => wp.row === tp.row && wp.col === tp.col),
  );

  return {
    waterPath,
    allTargetsReached,
    visitedCount: waterPath.length,
  };
}

export function applyWaterToGrid(
  grid: PipeCell[][],
  waterPath: Position[],
): PipeCell[][] {
  const newGrid = cloneGrid(grid);
  waterPath.forEach((pos, index) => {
    if (newGrid[pos.row] && newGrid[pos.row][pos.col]) {
      newGrid[pos.row][pos.col].hasWater = true;
      newGrid[pos.row][pos.col].waterAnimationDelay = index * 80;
    }
  });
  return newGrid;
}

export function createEmptyCell(): PipeCell {
  return {
    type: "empty",
    rotation: 0,
    isFixed: true,
    hasWater: false,
    waterAnimationDelay: 0,
  };
}

export function createPipeCell(
  type: PipeType,
  rotation: Rotation = 0,
  isFixed = false,
): PipeCell {
  return {
    type,
    rotation,
    isFixed,
    hasWater: false,
    waterAnimationDelay: 0,
  };
}
