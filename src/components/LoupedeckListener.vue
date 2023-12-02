<template></template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const hue = ref(0);
const saturation = ref(100);
const value = ref(50);

const HUE_DELTA_PER_WHEEL_SCROLL = 0.05;
const SATURATION_DELTA_PER_WHEEL_SCROLL = 0.1;

function handleKeyDown(event) {
  switch (event.key) {
    case "1": // RED
      setHSL(0, 100, 50);
      break;
    case "2": // ORANGE
      setHSL(30, 100, 50);
      break;
    case "3": // YELLOW
      setHSL(60, 100, 50);
      break;
    case "4": // GREEN
      setHSL(120, 100, 50);
      break;
    case "5": // BLUE
      setHSL(240, 100, 50);
      break;
    case "6": // PINK
      setHSL(300, 100, 50);
      break;
    case "7": // WHITE
      setHSL(0, 0, 100);
      break;
    case "8": // BLACK
      setHSL(0, 0, 0);
      break;
  }
}

function handleWheel(event) {
  if (event.shiftKey) {
    const hueDelta = event.deltaX * HUE_DELTA_PER_WHEEL_SCROLL;
    hue.value = Math.min(360, Math.max(0, hue.value + hueDelta));
    setHSL(hue.value, saturation.value, value.value);
  }
  if (event.ctrlKey) {
    const saturationDelta = event.deltaY * SATURATION_DELTA_PER_WHEEL_SCROLL;
    saturation.value = Math.min(
      100,
      Math.max(0, saturation.value + saturationDelta)
    );
    setHSL(hue.value, saturation.value, value.value);
  }
}

function setHSL(h, s, l) {
  console.log("setHSL", h, s, l);
  hue.value = h;
  saturation.value = s;
  value.value = l;
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("wheel", handleWheel);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("wheel", handleWheel);
});

// export function useColor() {
//   return { hue, saturation, value };
// }
</script>
