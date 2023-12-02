<template>
  <div class="w-60">
  <RadioGroup v-model="selectedColor">
    <RadioGroupLabel class="block text-sm font-medium leading-6 text-gray-900">Choose a label color</RadioGroupLabel>
    <div class="grid grid-cols-5 gap-4">
      <RadioGroupOption as="template" v-for="color in colors" :key="color" :value="color" v-slot="{ active, checked }">
        <div :class="[active && checked ? ' ring ring-offset-1' : '', !active && checked ? 'ring-2' : '', 'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-700']">
          <span aria-hidden="true" class='h-8 w-8 rounded-full border border-black border-opacity-10' :style="{'background-color': `rgb(${color.join(space)})`}"/>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
  <div class="relative flex cursor-pointer items-center justify-center rounded-full p-2">
    <button class="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="addCustomColor()">
      Add Color
    </button>
  </div>
</div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

const defaultColors = [[100, 0, 0], [100, 0, 100], [0, 100, 100], [0, 0, 100], [0, 100, 0]]
const space = " "

const customColors = [ [256,256,256]
]

const addCustomColor = () => {
  const color = [Math.round(Math.random() * 256), Math.round(Math.random() * 256), Math.round(Math.random() * 256)] 
    if (customColors.length > 4) {
      customColors.shift()
    }    
    customColors.push(color)
    colors.length = 0
    colors.push(...defaultColors)
    colors.push(...customColors)
}

const colors = reactive([...defaultColors, ...customColors])
const selectedColor = ref(defaultColors[1])
</script>