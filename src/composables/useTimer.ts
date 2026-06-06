import { ref, onUnmounted, watch } from "vue";

export function useTimer(initialTime = 0, autoStart = false) {
  const timeElapsed = ref(initialTime);
  const isRunning = ref(false);
  let intervalId: ReturnType<typeof setInterval> | null = null;

  function start() {
    if (isRunning.value) return;
    isRunning.value = true;
    intervalId = setInterval(() => {
      timeElapsed.value++;
    }, 1000);
  }

  function pause() {
    isRunning.value = false;
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function reset(newTime = 0) {
    pause();
    timeElapsed.value = newTime;
  }

  function restart() {
    reset(0);
    start();
  }

  onUnmounted(() => {
    pause();
  });

  return {
    timeElapsed,
    isRunning,
    start,
    pause,
    reset,
    restart,
  };
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
