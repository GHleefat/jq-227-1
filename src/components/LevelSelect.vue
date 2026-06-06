<script setup lang="ts">
import { Lock, Unlock, Star, CheckCircle, Clock } from "lucide-vue-next";
import { LEVELS } from "@/data/levels";

interface Props {
  completedLevels: number[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "select", levelId: number): void;
}>();

function isLevelUnlocked(levelId: number): boolean {
  if (levelId === 1) return true;
  return props.completedLevels.includes(levelId - 1);
}

function isLevelCompleted(levelId: number): boolean {
  return props.completedLevels.includes(levelId);
}
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    <div
      v-for="level in LEVELS"
      :key="level.id"
      class="level-card card-3d rounded-2xl p-5 cursor-pointer relative overflow-hidden"
      :class="{
        'opacity-50 cursor-not-allowed': !isLevelUnlocked(level.id),
        'ring-2 ring-pipe-target/50': isLevelCompleted(level.id),
      }"
      @click="isLevelUnlocked(level.id) && emit('select', level.id)"
    >
      <div v-if="isLevelCompleted(level.id)" class="absolute top-3 right-3">
        <CheckCircle class="w-6 h-6 text-pipe-target" />
      </div>

      <div class="flex items-center gap-3 mb-3">
        <div
          class="w-12 h-12 rounded-xl flex items-center justify-center font-orbitron font-bold text-xl"
          :class="
            isLevelUnlocked(level.id)
              ? 'bg-gradient-to-br from-pipe-water to-pipe-water-dark text-white'
              : 'bg-slate-700 text-slate-500'
          "
        >
          {{ level.id }}
        </div>
        <div>
          <div
            class="font-orbitron font-bold text-lg"
            :class="isLevelUnlocked(level.id) ? 'text-white' : 'text-slate-500'"
          >
            {{ level.name }}
          </div>
          <div class="flex gap-0.5">
            <Star
              v-for="i in 3"
              :key="i"
              class="w-3.5 h-3.5"
              :class="
                i <= level.difficulty
                  ? 'text-pipe-source fill-pipe-source'
                  : 'text-slate-600'
              "
            />
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between text-sm">
        <div class="text-slate-400 flex items-center gap-1">
          <span class="font-mono">{{ level.rows }}x{{ level.cols }}</span>
        </div>
        <div class="text-slate-400 flex items-center gap-1">
          <Clock class="w-4 h-4" />
          <span class="font-mono">{{ level.timeLimit }}s</span>
        </div>
        <div class="flex items-center gap-1">
          <Unlock
            v-if="isLevelUnlocked(level.id)"
            class="w-4 h-4 text-pipe-target"
          />
          <Lock v-else class="w-4 h-4 text-slate-500" />
        </div>
      </div>

      <div
        class="absolute inset-0 opacity-0 pointer-events-none transition-opacity"
        :class="{
          'bg-gradient-to-br from-pipe-water/10 to-transparent opacity-100':
            isLevelUnlocked(level.id),
        }"
      />
    </div>
  </div>
</template>
