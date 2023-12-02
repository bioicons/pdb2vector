<template></template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const emit = defineEmits(["colorChanged", "chainChanged"]);

const hue = ref(0);
const saturation = ref(100);
const value = ref(50);

const chains = ["global", "A", "B", "C"];
const targetChainIndex = ref(0);
const targetChain = ref(chains[0]);

const DELTA_HUE_PER_KEY_PRESS = 5;
const DELTA_SATURATION_PER_KEY_PRESS = 5;

function handleKeyDown(event) {
  let changed = true;
  switch (event.key) {
    case "1": // RED
      hue.value = 0;
      saturation.value = 100;
      value.value = 50;
      break;
    case "2": // ORANGE
      hue.value = 30;
      saturation.value = 100;
      value.value = 50;
      break;
    case "3": // YELLOW
      hue.value = 60;
      saturation.value = 100;
      value.value = 50;
      break;
    case "4": // GREEN
      hue.value = 120;
      saturation.value = 100;
      value.value = 50;
      break;
    case "5": // BLUE
      hue.value = 240;
      saturation.value = 100;
      value.value = 50;
      break;
    case "6": // PINK
      hue.value = 300;
      saturation.value = 100;
      value.value = 50;
      break;
    case "7": // WHITE
      hue.value = 0;
      saturation.value = 0;
      value.value = 100;
      break;
    case "8": // BLACK
      hue.value = 0;
      saturation.value = 0;
      value.value = 0;
      break;
    case "H": // HUE
    case "h":
      if (event.shiftKey) {
        hue.value = Math.min(
          360,
          Math.max(0, hue.value - DELTA_HUE_PER_KEY_PRESS)
        );
      } else {
        hue.value = Math.min(
          360,
          Math.max(0, hue.value + DELTA_HUE_PER_KEY_PRESS)
        );
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
    default:
      changed = false;
      break;
  }
  if (changed) {
    setHSL(hue.value, saturation.value, value.value);
  }
  switch (event.key) {
    case "N": // NEXT CHAIN
      targetChainIndex.value = (targetChainIndex.value + 1) % chains.length;
      setChain(chains[targetChainIndex.value]);
      break;
    case "P": // PREVIOUS CHAIN
      targetChainIndex.value =
        (targetChainIndex.value - 1 + chains.length) % chains.length;
      setChain(chains[targetChainIndex.value]);
      break;
  }
}

function setHSL(h, s, l) {
  console.log("setHSL", h, s, l);
  hue.value = h;
  saturation.value = s;
  value.value = l;
  emit("colorChanged", { h, s, l });
}

function setChain(chain) {
  console.log("setChain", chain);
  targetChain.value = chain;
  emit("chainChanged", chain);
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>
