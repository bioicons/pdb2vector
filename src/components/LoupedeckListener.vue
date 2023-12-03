<template></template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";

const emit = defineEmits(["colorChanged", "chainChanged"]);

const props = defineProps({
  chains: Array,
  chainColors: Object,
  currentTarget: String,
});

// initialize targetChainIndex using props
const targetChainIndex = computed(() =>
  props.chains.indexOf(props.currentTarget)
);

const hsl = computed(
  () => props.chainColors[props.currentTarget] ?? { h: 0, s: 0, l: 0 }
);

const hue = computed(() => hsl.value.h);
const saturation = computed(() => hsl.value.s);
const value = computed(() => hsl.value.l);

const DELTA_HUE_PER_KEY_PRESS = 5;
const DELTA_SATURATION_PER_KEY_PRESS = 5;

function handleKeyDown(event) {
  let changed = true;
  let nextHue = hue.value,
    nextSaturation = saturation.value,
    nextValue = value.value;
  switch (event.key) {
    case "1": // RED
      nextHue = 0;
      nextSaturation = 100;
      nextValue = 50;
      break;
    case "2": // ORANGE
      nextHue = 30;
      nextSaturation = 100;
      nextValue = 50;
      break;
    case "3": // YELLOW
      nextHue = 60;
      nextSaturation = 100;
      nextValue = 50;
      break;
    case "4": // GREEN
      nextHue = 120;
      nextSaturation = 100;
      nextValue = 50;
      break;
    case "5": // BLUE
      nextHue = 240;
      nextSaturation = 100;
      nextValue = 50;
      break;
    case "6": // PINK
      nextHue = 300;
      nextSaturation = 100;
      nextValue = 50;
      break;
    case "7": // WHITE
      nextHue = 0;
      nextSaturation = 0;
      nextValue = 100;
      break;
    case "8": // BLACK
      nextHue = 0;
      nextSaturation = 0;
      nextValue = 0;
      break;
    case "H": // HUE
    case "h":
      if (event.shiftKey) {
        nextHue = (hue.value - DELTA_HUE_PER_KEY_PRESS) % 360;
      } else {
        nextHue = (hue.value + DELTA_HUE_PER_KEY_PRESS) % 360;
      }
      break;
    case "S": // SATURATION
    case "s":
      if (event.shiftKey) {
        nextSaturation = Math.min(
          100,
          Math.max(0, saturation.value - DELTA_SATURATION_PER_KEY_PRESS)
        );
      } else {
        nextSaturation = Math.min(
          100,
          Math.max(0, saturation.value + DELTA_SATURATION_PER_KEY_PRESS)
        );
      }
      break;
    default:
      changed = false;
      break;
  }
  if (changed) {
    setHSL(nextHue, nextSaturation, nextValue);
  }

  let nextTargetChainIndex;
  switch (event.key) {
    case "N": // NEXT CHAIN
      nextTargetChainIndex = (targetChainIndex.value + 1) % props.chains.length;
      setChain(props.chains[nextTargetChainIndex]);
      break;
    case "P": // PREVIOUS CHAIN
      nextTargetChainIndex =
        (targetChainIndex.value - 1 + props.chains.length) %
        props.chains.length;
      setChain(props.chains[nextTargetChainIndex]);
      break;
  }
}

function setHSL(h, s, l) {
  console.log("setHSL", h, s, l);
  emit("colorChanged", { h, s, l });
}

function setChain(chain) {
  console.log("setChain", chain);
  emit("chainChanged", chain);
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>
