<script setup lang="ts">
import { Trophy, XCircle, RotateCcw, Home, ArrowRight } from "lucide-vue-next";
import type { GameStatus } from "@/types/pipe";

interface Props {
  status: GameStatus;
  moves: number;
  timeElapsed: number;
  hasNextLevel: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "retry"): void;
  (e: "home"): void;
  (e: "next"): void;
}>();

const isWin = computed(() => props.status === "won");

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="status === 'won' || status === 'lost'"
      class="fixed inset-0 z-50 flex items-center justify-center modal-overlay p-4"
    >
      <div
        class="relative card-3d rounded-3xl p-8 max-w-md w-full animate-rotate-in"
        :class="{ 'animate-win-burst': isWin }"
      >
        <div
          class="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-2xl"
          :class="
            isWin
              ? 'bg-gradient-to-br from-pipe-target to-emerald-600'
              : 'bg-gradient-to-br from-pipe-danger to-red-700'
          "
        >
          <Trophy v-if="isWin" class="w-12 h-12 text-white" />
          <XCircle v-else class="w-12 h-12 text-white" />
        </div>

        <div class="pt-8 text-center">
          <h2
            class="font-orbitron text-3xl font-bold mb-2"
            :class="isWin ? 'text-pipe-target' : 'text-pipe-danger'"
          >
            {{ isWin ? "🎉 通关成功！" : "💥 挑战失败" }}
          </h2>
          <p class="text-slate-400 mb-6">
            {{
              isWin
                ? "完美的管道连接！水流已顺利到达所有出水口。"
                : "管道未能连通，再试一次吧！"
            }}
          </p>

          <div class="grid grid-cols-2 gap-3 mb-6">
            <div class="bg-slate-800/50 rounded-xl p-4">
              <div class="text-slate-400 text-sm mb-1">使用步数</div>
              <div class="font-orbitron text-2xl font-bold text-white">
                {{ moves }}
              </div>
            </div>
            <div class="bg-slate-800/50 rounded-xl p-4">
              <div class="text-slate-400 text-sm mb-1">用时</div>
              <div class="font-orbitron text-2xl font-bold text-white">
                {{ formatTime(timeElapsed) }}
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              class="btn-secondary text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
              @click="emit('home')"
            >
              <Home class="w-5 h-5" />
              返回主页
            </button>
            <button
              class="btn-primary text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
              @click="emit('retry')"
            >
              <RotateCcw class="w-5 h-5" />
              重试
            </button>
            <button
              v-if="isWin && hasNextLevel"
              class="bg-gradient-to-r from-pipe-target to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-pipe-target/30 transition-all hover:scale-105"
              @click="emit('next')"
            >
              下一关
              <ArrowRight class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { computed } from "vue";
export default { name: "ResultModal" };
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
