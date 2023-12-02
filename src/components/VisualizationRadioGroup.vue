<template>
  <div class="grid grid-cols-5 gap-6 h-36 items-stretch">
    <div v-for="type in types" :key="type">
      <div class="h-full">
        <label
          :for="type"
          class="relative flex flex-col bg-white p-5 rounded-lg shadow-md cursor-pointer h-full"
        >
          <span
            class="font-semibold text-md text-gray-900 leading-tight uppercase m-auto"
            >{{ type }}</span
          >
          <input
            type="radio"
            name="plan"
            :id="type"
            :value="type"
            class="absolute h-0 w-0 appearance-none"
          />
          <span
            aria-hidden="true"
            class="hidden absolute inset-0 border-2 border-green-500 bg-green-200 bg-opacity-10 rounded-lg"
          >
            <span
              class="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-green-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5 text-green-600"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
const types = [
  "cartoon",
  "ball-and-stick",
  "molecular-surface",
  "point",
  "spacefill",
];
</script>

<style>
input[type="radio"]:checked + span {
  display: block;
}
</style>
