<script setup lang="ts">
import type { PipeCell, Position } from "@/types/pipe";
import PipeSvg from "@/components/PipeSvg.vue";

interface Props {
  grid: PipeCell[][];
  sourcePos: Position;
  targetPositions: Position[];
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<{
  (e: "cellClick", row: number, col: number): void;
}>();

const cellSize = computed(() => {
  const cols = props.grid[0]?.length || 4;
  if (cols <= 4) return 80;
  if (cols <= 5) return 70;
  return 60;
});

function isSource(row: number, col: number) {
  return props.sourcePos.row === row && props.sourcePos.col === col;
}

function isTarget(row: number, col: number) {
  return props.targetPositions.some((t) => t.row === row && t.col === col);
}

function handleClick(row: number, col: number, cell: PipeCell) {
  if (props.disabled || cell.type === "empty") return;
  emit("cellClick", row, col);
}
</script>

<template>
  <div class="p-4 md:p-6 rounded-2xl card-3d">
    <div
      class="grid gap-1 md:gap-1.5"
      :style="{
        gridTemplateColumns: `repeat(${grid[0]?.length || 0}, minmax(0, 1fr))`,
      }"
    >
      <div
        v-for="(row, rowIndex) in grid"
        v-bind:key="rowIndex"
        class="contents"
      >
        <div
          v-for="(cell, colIndex) in row"
          v-bind:key="`${rowIndex}-${colIndex}`"
          class="pipe-grid-cell relative rounded-lg cursor-pointer select-none"
          :class="{
            fixed: cell.type === 'empty',
            'cursor-not-allowed': disabled || cell.type === 'empty',
            'bg-slate-800/40 border border-pipe-border': cell.type !== 'empty',
            'bg-slate-900/60 rounded-lg border border-slate-800/50':
              cell.type === 'empty',
            'animate-pulse-glow':
              cell.hasWater && cell.type !== 'source' && cell.type !== 'target',
          }"
          :style="{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            animationDelay: `${cell.waterAnimationDelay}ms`,
          }"
          @click="handleClick(rowIndex, colIndex, cell)"
        >
          <div
            v-if="cell.type !== 'empty'"
            class="absolute inset-0.5 rounded-md overflow-hidden"
            :style="{
              animationDelay: `${cell.waterAnimationDelay}ms`,
            }"
          >
            <PipeSvg :pipe="cell" :cell-size="cellSize" />
          </div>

          <div
            v-if="isSource(rowIndex, colIndex)"
            class="absolute -top-1 -right-1 w-5 h-5 bg-pipe-source rounded-full flex items-center justify-center text-[10px] font-bold text-pipe-bg shadow-lg z-10 border-2 border-pipe-bg"
          >
            💧
          </div>
          <div
            v-if="isTarget(rowIndex, colIndex)"
            class="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg z-10 border-2 border-pipe-bg"
            :class="
              cell.hasWater
                ? 'bg-pipe-target text-white'
                : 'bg-slate-600 text-slate-400'
            "
          >
            🎯
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
export default { name: "PipeGrid" };
</script>
