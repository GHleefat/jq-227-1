<script setup lang="ts">
import {
  Wrench,
  PlayCircle,
  Info,
  Target,
  Droplets,
  RotateCw,
} from "lucide-vue-next";
import { useRouter } from "vue-router";
import LevelSelect from "@/components/LevelSelect.vue";
import { useGame } from "@/composables/useGame";

const router = useRouter();
const { completedLevels } = useGame();

function goToLevel(levelId: number) {
  router.push(`/game/${levelId}`);
}
</script>

<template>
  <div
    class="min-h-screen relative z-10 flex flex-col items-center justify-center px-4 py-8"
  >
    <div class="max-w-4xl w-full">
      <div class="text-center mb-10 animate-rotate-in">
        <div class="inline-flex items-center justify-center gap-4 mb-4">
          <div
            class="w-16 h-16 rounded-2xl bg-gradient-to-br from-pipe-water to-pipe-water-dark flex items-center justify-center shadow-lg shadow-pipe-water/30"
          >
            <Wrench class="w-9 h-9 text-white" />
          </div>
        </div>
        <h1
          class="font-orbitron text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pipe-water via-cyan-300 to-pipe-water mb-3"
        >
          管道连接工程师
        </h1>
        <p class="text-slate-400 text-lg md:text-xl font-inter">
          Pipe Engineer · 连接水源，点亮每一个出水口
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div class="card-3d rounded-2xl p-5 flex items-start gap-4">
          <div
            class="w-12 h-12 rounded-xl bg-pipe-source/20 flex items-center justify-center flex-shrink-0"
          >
            <Droplets class="w-6 h-6 text-pipe-source" />
          </div>
          <div>
            <h3 class="font-orbitron font-bold text-white mb-1">连通水流</h3>
            <p class="text-sm text-slate-400">
              从水源出发，让水流流经每一节管道
            </p>
          </div>
        </div>
        <div class="card-3d rounded-2xl p-5 flex items-start gap-4">
          <div
            class="w-12 h-12 rounded-xl bg-pipe-water/20 flex items-center justify-center flex-shrink-0"
          >
            <RotateCw class="w-6 h-6 text-pipe-water" />
          </div>
          <div>
            <h3 class="font-orbitron font-bold text-white mb-1">旋转管道</h3>
            <p class="text-sm text-slate-400">
              点击格子旋转管道方向，规划最优路径
            </p>
          </div>
        </div>
        <div class="card-3d rounded-2xl p-5 flex items-start gap-4">
          <div
            class="w-12 h-12 rounded-xl bg-pipe-target/20 flex items-center justify-center flex-shrink-0"
          >
            <Target class="w-6 h-6 text-pipe-target" />
          </div>
          <div>
            <h3 class="font-orbitron font-bold text-white mb-1">到达终点</h3>
            <p class="text-sm text-slate-400">
              在限定时间和步数内连接所有出水口
            </p>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex items-center gap-3 mb-4">
          <PlayCircle class="w-6 h-6 text-pipe-water" />
          <h2 class="font-orbitron text-xl font-bold text-white">选择关卡</h2>
          <span class="text-sm text-slate-500 ml-auto">
            已通关 {{ completedLevels.length }} / 6
          </span>
        </div>
        <LevelSelect :completed-levels="completedLevels" @select="goToLevel" />
      </div>

      <div class="text-center mt-10">
        <div
          class="inline-flex items-center gap-2 text-slate-500 text-sm bg-slate-800/50 rounded-full px-4 py-2"
        >
          <Info class="w-4 h-4" />
          <span>点击关卡卡片开始游戏 · 进度自动保存</span>
        </div>
      </div>
    </div>
  </div>
</template>
