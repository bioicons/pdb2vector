<template>
  <div class="grid grid-cols-6 gap-4 h-30 items-stretch w-full">
    <div v-for="type in types" :key="type">
      <div class="h-full">
        <label :for="type"
          class="relative flex flex-col bg-white p-5 rounded-lg shadow-md border border-gray-200 cursor-pointer h-full">
          <span class="font-semibold text-sm text-gray-900 leading-tight uppercase m-auto">{{ type }}</span>
          <input type="radio" name="plan" :id="type" :value="type" v-model="selectedType"
            @change="$emit('updateVisualization', selectedType)" class="absolute h-0 w-0 appearance-none" />
          <span aria-hidden="true"
            class="hidden absolute inset-0 border-2 border-green-500 bg-green-200 bg-opacity-10 rounded-lg">
            <span
              class="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-green-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                class="h-5 w-5 text-green-600">
                <path fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd" />
              </svg>
            </span>
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted, onUnmounted } from "vue";

const types = [
  "cartoon",
  "ball-and-stick",
  "molecular-surface",
  "point",
  "spacefill",
];
const selectedType = ref(types[0]);
const emit = defineEmits(["updateVisualization"]);

function handleKeyDown(event) {
  let changed = true;
  switch (event.key) {
    case "z":
      selectedType.value = "cartoon";
      break;
    case "x":
      selectedType.value = "ball-and-stick";
      break;
    case "c":
      selectedType.value = "molecular-surface";
      break;
    case "v":
      selectedType.value = "spacefill";
      break;
    default:
      changed = false;
  }
  if (changed) {
    emit("updateVisualization", selectedType.value);
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<style>
input[type="radio"]:checked+span {
  display: block;
}
</style>
