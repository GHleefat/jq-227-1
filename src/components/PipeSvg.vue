<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import type { PipeCell } from "@/types/pipe";

interface Props {
  pipe: PipeCell;
  cellSize?: number;
}

const props = withDefaults(defineProps<Props>(), {
  cellSize: 72,
});

const displayRotation = ref(0);

onMounted(() => {
  displayRotation.value = props.pipe.rotation;
});

watch(
  () => props.pipe.rotation,
  (newVal, oldVal) => {
    if (oldVal === undefined) {
      displayRotation.value = newVal;
      return;
    }
    const delta = (newVal - oldVal + 360) % 360;
    if (delta === 90) {
      displayRotation.value += 90;
    } else if (delta === 0) {
      // no change
    } else {
      displayRotation.value = newVal;
    }
  },
);

const pipeStyle = computed(() => ({
  transform: `rotate(${displayRotation.value}deg)`,
  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
}));

const hasWater = computed(() => props.pipe.hasWater);
</script>

<template>
  <div
    class="relative w-full h-full flex items-center justify-center overflow-hidden"
    :class="{
      'glow-water':
        hasWater && pipe.type !== 'source' && pipe.type !== 'target',
      'glow-source': pipe.type === 'source',
      'glow-target': pipe.type === 'target' && hasWater,
    }"
  >
    <svg
      :width="cellSize"
      :height="cellSize"
      viewBox="0 0 72 72"
      :style="pipeStyle"
      class="max-w-full max-h-full"
    >
      <defs>
        <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" :stop-color="hasWater ? '#0284c7' : '#475569'" />
          <stop offset="30%" :stop-color="hasWater ? '#38bdf8' : '#94a3b8'" />
          <stop offset="50%" :stop-color="hasWater ? '#7dd3fc' : '#cbd5e1'" />
          <stop offset="70%" :stop-color="hasWater ? '#38bdf8' : '#94a3b8'" />
          <stop offset="100%" :stop-color="hasWater ? '#0284c7' : '#475569'" />
        </linearGradient>
        <linearGradient id="waterInner" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0284c7" />
          <stop offset="50%" stop-color="#38bdf8" />
          <stop offset="100%" stop-color="#0284c7" />
        </linearGradient>
        <radialGradient id="sourceGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fbbf24" />
          <stop offset="100%" stop-color="#f59e0b" />
        </radialGradient>
        <radialGradient id="targetGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#34d399" />
          <stop offset="100%" stop-color="#10b981" />
        </radialGradient>
      </defs>

      <template v-if="pipe.type === 'straight'">
        <rect
          x="30"
          y="0"
          width="12"
          height="72"
          fill="url(#metalGrad)"
          rx="2"
        />
        <rect
          v-if="hasWater"
          x="33"
          y="0"
          width="6"
          height="72"
          fill="url(#waterInner)"
          class="water-gradient"
          opacity="0.9"
        />
      </template>

      <template v-else-if="pipe.type === 'elbow'">
        <rect
          x="30"
          y="0"
          width="12"
          height="42"
          fill="url(#metalGrad)"
          rx="2"
        />
        <rect
          x="30"
          y="30"
          width="42"
          height="12"
          fill="url(#metalGrad)"
          rx="2"
        />
        <circle cx="36" cy="36" r="10" fill="url(#metalGrad)" />
        <rect
          v-if="hasWater"
          x="33"
          y="0"
          width="6"
          height="42"
          fill="url(#waterInner)"
          opacity="0.9"
        />
        <rect
          v-if="hasWater"
          x="30"
          y="33"
          width="42"
          height="6"
          fill="url(#waterInner)"
          opacity="0.9"
        />
        <circle
          v-if="hasWater"
          cx="36"
          cy="36"
          r="5"
          fill="url(#waterInner)"
          opacity="0.9"
        />
      </template>

      <template v-else-if="pipe.type === 'tee'">
        <rect
          x="30"
          y="0"
          width="12"
          height="72"
          fill="url(#metalGrad)"
          rx="2"
        />
        <rect
          x="42"
          y="30"
          width="30"
          height="12"
          fill="url(#metalGrad)"
          rx="2"
        />
        <rect
          v-if="hasWater"
          x="33"
          y="0"
          width="6"
          height="72"
          fill="url(#waterInner)"
          opacity="0.9"
        />
        <rect
          v-if="hasWater"
          x="42"
          y="33"
          width="30"
          height="6"
          fill="url(#waterInner)"
          opacity="0.9"
        />
      </template>

      <template v-else-if="pipe.type === 'cross'">
        <rect
          x="30"
          y="0"
          width="12"
          height="72"
          fill="url(#metalGrad)"
          rx="2"
        />
        <rect
          x="0"
          y="30"
          width="72"
          height="12"
          fill="url(#metalGrad)"
          rx="2"
        />
        <rect
          v-if="hasWater"
          x="33"
          y="0"
          width="6"
          height="72"
          fill="url(#waterInner)"
          opacity="0.9"
        />
        <rect
          v-if="hasWater"
          x="0"
          y="33"
          width="72"
          height="6"
          fill="url(#waterInner)"
          opacity="0.9"
        />
      </template>

      <template v-else-if="pipe.type === 'source'">
        <circle cx="36" cy="36" r="28" fill="url(#sourceGlow)" />
        <circle cx="36" cy="36" r="20" fill="#fde68a" />
        <rect
          x="36"
          y="30"
          width="36"
          height="12"
          fill="url(#metalGrad)"
          rx="2"
        />
        <rect
          v-if="hasWater"
          x="36"
          y="33"
          width="36"
          height="6"
          fill="url(#waterInner)"
          opacity="0.9"
        />
        <text
          x="36"
          y="41"
          text-anchor="middle"
          font-size="16"
          font-weight="bold"
          fill="#78350f"
          font-family="Orbitron, sans-serif"
        >
          S
        </text>
      </template>

      <template v-else-if="pipe.type === 'target'">
        <circle
          cx="36"
          cy="36"
          r="28"
          :fill="hasWater ? 'url(#targetGlow)' : '#1e293b'"
          :stroke="hasWater ? '#34d399' : '#475569'"
          stroke-width="2"
        />
        <circle
          cx="36"
          cy="36"
          r="20"
          :fill="hasWater ? '#a7f3d0' : '#0f172a'"
        />
        <rect
          x="0"
          y="30"
          width="36"
          height="12"
          fill="url(#metalGrad)"
          rx="2"
        />
        <rect
          v-if="hasWater"
          x="0"
          y="33"
          width="36"
          height="6"
          fill="url(#waterInner)"
          opacity="0.9"
        />
        <text
          x="36"
          y="41"
          text-anchor="middle"
          font-size="16"
          font-weight="bold"
          :fill="hasWater ? '#064e3b' : '#64748b'"
          font-family="Orbitron, sans-serif"
        >
          E
        </text>
      </template>
    </svg>
  </div>
</template>
