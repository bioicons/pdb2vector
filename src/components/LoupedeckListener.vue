<template></template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const hue = ref(0);
const saturation = ref(100);
const value = ref(50);

const chains = ["global", "A", "B", "C"];
const targetChainIndex = ref(0);
const targetChain = ref(chains[0]);

const DELTA_HUE_PER_KEY_PRESS = 5;
const DELTA_SATURATION_PER_KEY_PRESS = 5;

function handleKeyDown(event) {
  console.log(event);
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
    case "N": // NEXT CHAIN
      targetChainIndex.value = (targetChainIndex.value + 1) % chains.length;
      targetChain.value = chains[targetChainIndex.value];
      console.log("targetChain", targetChain.value);

      break;
    case "P": // PREVIOUS CHAIN
      targetChainIndex.value =
        (targetChainIndex.value - 1 + chains.length) % chains.length;
      targetChain.value = chains[targetChainIndex.value];
      console.log("targetChain", targetChain.value);

      break;
    case "H": // HUE
    case "h":
      if (event.shiftKey) {
        hue.value = Math.min(
          360,
          Math.max(0, hue.value - DELTA_HUE_PER_KEY_PRESS)
        );
        setHSL(hue.value, saturation.value, value.value);
      } else {
        hue.value = Math.min(
          360,
          Math.max(0, hue.value + DELTA_HUE_PER_KEY_PRESS)
        );
        setHSL(hue.value, saturation.value, value.value);
      }
      break;
    case "S": // SATURATION
    case "s":
      if (event.shiftKey) {
        saturation.value = Math.min(
          100,
          Math.max(0, saturation.value - DELTA_SATURATION_PER_KEY_PRESS)
        );
        setHSL(hue.value, saturation.value, value.value);
      } else {
        saturation.value = Math.min(
          100,
          Math.max(0, saturation.value + DELTA_SATURATION_PER_KEY_PRESS)
        );
        setHSL(hue.value, saturation.value, value.value);
      }
      break;
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
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

// export function useColor() {
//   return { hue, saturation, value };
// }
</script>
