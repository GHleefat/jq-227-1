import { ref, computed, watch } from "vue";
import type { GameStatus, Level, PipeCell, Position } from "@/types/pipe";
import {
  applyWaterToGrid,
  bfsWaterFlow,
  clearWater,
  cloneGrid,
  rotatePipe,
} from "@/utils/pipeUtils";
import { getLevelById, LEVELS } from "@/data/levels";
import { useTimer } from "@/composables/useTimer";

const STORAGE_KEY = "pipe-engineer-progress";

function loadProgress(): number[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveProgress(levels: number[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(levels));
  } catch {
    // ignore
  }
}

export function useGame() {
  const currentLevelId = ref<number | null>(null);
  const currentLevel = ref<Level | null>(null);
  const grid = ref<PipeCell[][]>([]);
  const moves = ref(0);
  const status = ref<GameStatus>("idle");
  const waterPath = ref<Position[]>([]);
  const completedLevels = ref<number[]>(loadProgress());
  const isAnimating = ref(false);

  const {
    timeElapsed,
    start: startTimer,
    pause: pauseTimer,
    reset: resetTimer,
  } = useTimer();

  const remainingTime = computed(() => {
    if (!currentLevel.value) return 0;
    return Math.max(0, currentLevel.value.timeLimit - timeElapsed.value);
  });

  const remainingMoves = computed(() => {
    if (!currentLevel.value) return 0;
    return Math.max(0, currentLevel.value.moveLimit - moves.value);
  });

  const isTimeUp = computed(
    () => remainingTime.value <= 0 && currentLevel.value !== null,
  );
  const isMovesUp = computed(
    () => remainingMoves.value <= 0 && currentLevel.value !== null,
  );

  function loadLevel(levelId: number) {
    const level = getLevelById(levelId);
    if (!level) return false;

    currentLevelId.value = levelId;
    currentLevel.value = level;
    grid.value = clearWater(cloneGrid(level.grid));
    moves.value = 0;
    status.value = "playing";
    waterPath.value = [];
    isAnimating.value = false;
    resetTimer(0);
    startTimer();
    checkWaterFlow();
    return true;
  }

  function rotateCell(row: number, col: number) {
    if (status.value !== "playing" || isAnimating.value) return;
    if (!currentLevel.value) return;
    if (grid.value[row][col].isFixed) return;

    moves.value++;
    grid.value[row][col] = rotatePipe(grid.value[row][col]);

    checkWaterFlow();

    if (remainingMoves.value <= 0 && status.value === "playing") {
      const result = bfsWaterFlow(
        grid.value,
        currentLevel.value.sourcePos,
        currentLevel.value.targetPositions,
      );
      if (!result.allTargetsReached) {
        gameOver(false);
      }
    }
  }

  function checkWaterFlow() {
    if (!currentLevel.value) return;

    const result = bfsWaterFlow(
      grid.value,
      currentLevel.value.sourcePos,
      currentLevel.value.targetPositions,
    );

    waterPath.value = result.waterPath;
    grid.value = applyWaterToGrid(grid.value, result.waterPath);

    if (result.allTargetsReached) {
      gameOver(true);
    }
  }

  function gameOver(won: boolean) {
    pauseTimer();
    status.value = won ? "won" : "lost";

    if (won && currentLevelId.value !== null) {
      if (!completedLevels.value.includes(currentLevelId.value)) {
        completedLevels.value = [
          ...completedLevels.value,
          currentLevelId.value,
        ];
        saveProgress(completedLevels.value);
      }
    }
  }

  function resetLevel() {
    if (currentLevelId.value !== null) {
      loadLevel(currentLevelId.value);
    }
  }

  function exitGame() {
    pauseTimer();
    status.value = "idle";
    currentLevelId.value = null;
    currentLevel.value = null;
    grid.value = [];
    moves.value = 0;
    waterPath.value = [];
  }

  function nextLevel() {
    if (!currentLevel.value) return;
    const nextId = currentLevel.value.id + 1;
    const nextLevelData = LEVELS.find((l) => l.id === nextId);
    if (nextLevelData) {
      loadLevel(nextId);
    }
  }

  const hasNextLevel = computed(() => {
    if (!currentLevel.value) return false;
    return LEVELS.some((l) => l.id === currentLevel.value!.id + 1);
  });

  watch(isTimeUp, (val) => {
    if (val && status.value === "playing") {
      gameOver(false);
    }
  });

  return {
    currentLevel,
    currentLevelId,
    grid,
    moves,
    timeElapsed,
    remainingTime,
    remainingMoves,
    status,
    waterPath,
    completedLevels,
    isAnimating,
    hasNextLevel,
    loadLevel,
    rotateCell,
    resetLevel,
    exitGame,
    nextLevel,
  };
}
