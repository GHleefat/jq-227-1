<script setup lang="ts">
import { watch, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Home, RotateCcw } from "lucide-vue-next";
import PipeGrid from "@/components/PipeGrid.vue";
import StatusBar from "@/components/StatusBar.vue";
import ResultModal from "@/components/ResultModal.vue";
import { useGame } from "@/composables/useGame";

const route = useRoute();
const router = useRouter();
const {
  currentLevel,
  grid,
  moves,
  timeElapsed,
  remainingTime,
  remainingMoves,
  status,
  hasNextLevel,
  loadLevel,
  rotateCell,
  resetLevel,
  exitGame,
  nextLevel,
} = useGame();

const levelId = computed(() => Number(route.params.levelId));

function goHome() {
  exitGame();
  router.push("/");
}

onMounted(() => {
  if (levelId.value) {
    const success = loadLevel(levelId.value);
    if (!success) {
      router.push("/");
    }
  }
});

watch(levelId, (newId) => {
  if (newId) {
    loadLevel(newId);
  }
});
</script>

<template>
  <div class="min-h-screen relative z-10 flex flex-col px-4 py-6 md:py-8">
    <div class="max-w-5xl w-full mx-auto flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <button
          class="btn-secondary text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2"
          @click="goHome"
        >
          <Home class="w-5 h-5" />
          <span class="hidden sm:inline">返回主页</span>
        </button>
        <h1 class="font-orbitron text-xl md:text-2xl font-bold text-white">
          🔧 管道连接工程师
        </h1>
        <button
          class="btn-secondary text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2"
          @click="resetLevel"
        >
          <RotateCcw class="w-5 h-5" />
          <span class="hidden sm:inline">重置</span>
        </button>
      </div>

      <StatusBar
        v-if="currentLevel"
        :level-name="currentLevel.name"
        :level-id="currentLevel.id"
        :time-elapsed="timeElapsed"
        :time-limit="currentLevel.timeLimit"
        :moves="moves"
        :move-limit="currentLevel.moveLimit"
        :difficulty="currentLevel.difficulty"
      />

      <div class="flex-1 flex items-center justify-center">
        <div v-if="currentLevel && grid.length > 0" class="animate-rotate-in">
          <PipeGrid
            :grid="grid"
            :source-pos="currentLevel.sourcePos"
            :target-positions="currentLevel.targetPositions"
            :disabled="status !== 'playing'"
            @cell-click="rotateCell"
          />
        </div>
      </div>

      <div class="text-center text-slate-500 text-sm">
        <p>💡 点击管道格子旋转方向 · 将水源 💧 连接到所有出水口 🎯</p>
      </div>
    </div>

    <ResultModal
      :status="status"
      :moves="moves"
      :time-elapsed="timeElapsed"
      :has-next-level="hasNextLevel"
      @retry="resetLevel"
      @home="goHome"
      @next="nextLevel"
    />
  </div>
</template>
