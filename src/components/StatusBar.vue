<script setup lang="ts">
import { Clock, Footprints, Layers, Trophy } from "lucide-vue-next";
import { formatTime } from "@/composables/useTimer";

interface Props {
  levelName: string;
  levelId: number;
  timeElapsed: number;
  timeLimit: number;
  moves: number;
  moveLimit: number;
  difficulty: number;
}

const props = defineProps<Props>();

const timePercent = computed(() => {
  return Math.max(
    0,
    Math.min(
      100,
      ((props.timeLimit - props.timeElapsed) / props.timeLimit) * 100,
    ),
  );
});

const movePercent = computed(() => {
  return Math.max(
    0,
    Math.min(100, ((props.moveLimit - props.moves) / props.moveLimit) * 100),
  );
});

const timeColor = computed(() => {
  if (timePercent.value > 50) return "bg-pipe-water";
  if (timePercent.value > 25) return "bg-yellow-500";
  return "bg-pipe-danger";
});

const moveColor = computed(() => {
  if (movePercent.value > 50) return "bg-pipe-target";
  if (movePercent.value > 25) return "bg-yellow-500";
  return "bg-pipe-danger";
});
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
    <div class="card-3d rounded-xl p-4">
      <div class="flex items-center gap-2 text-slate-400 text-sm mb-1">
        <Layers class="w-4 h-4 text-pipe-water" />
        <span>关卡</span>
      </div>
      <div class="font-orbitron text-xl font-bold text-white">
        {{ levelId }}. {{ levelName }}
      </div>
      <div class="flex gap-0.5 mt-1">
        <span
          v-for="i in 3"
          :key="i"
          class="text-sm"
          :class="i <= difficulty ? 'text-pipe-source' : 'text-slate-600'"
        >
          ★
        </span>
      </div>
    </div>

    <div class="card-3d rounded-xl p-4">
      <div class="flex items-center gap-2 text-slate-400 text-sm mb-1">
        <Trophy class="w-4 h-4 text-pipe-source" />
        <span>已用步数</span>
      </div>
      <div class="font-orbitron text-xl font-bold text-white">
        {{ moves }}
        <span class="text-sm text-slate-500">/ {{ moveLimit }}</span>
      </div>
      <div class="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-300"
          :class="moveColor"
          :style="{ width: `${movePercent}%` }"
        />
      </div>
    </div>

    <div class="card-3d rounded-xl p-4">
      <div class="flex items-center gap-2 text-slate-400 text-sm mb-1">
        <Clock class="w-4 h-4 text-pipe-target" />
        <span>剩余时间</span>
      </div>
      <div class="font-orbitron text-xl font-bold text-white">
        {{ formatTime(Math.max(0, timeLimit - timeElapsed)) }}
      </div>
      <div class="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-300"
          :class="timeColor"
          :style="{ width: `${timePercent}%` }"
        />
      </div>
    </div>

    <div class="card-3d rounded-xl p-4">
      <div class="flex items-center gap-2 text-slate-400 text-sm mb-1">
        <Footprints class="w-4 h-4 text-purple-400" />
        <span>总用时</span>
      </div>
      <div class="font-orbitron text-xl font-bold text-white">
        {{ formatTime(timeElapsed) }}
      </div>
      <div class="text-xs text-slate-500 mt-1">
        剩余步数:
        <span
          class="font-semibold"
          :class="movePercent < 25 ? 'text-pipe-danger' : 'text-slate-300'"
          >{{ Math.max(0, moveLimit - moves) }}</span
        >
      </div>
    </div>
  </div>
</template>
