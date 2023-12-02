<template>
  <div>
    <div>
      <label for="tabs" class="sr-only">Chain</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <div class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
        <button v-for="tab in tabs" :key="tab" :class="[[tab ==current ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700', 'rounded-md px-3 py-2 text-sm font-medium']]" @click="setCurrent(tab)">{{ tab }}</button>
      </div>
    </div>
  </div>
  <div class="w-60">
  <RadioGroup v-model="chains[current]">
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

const {chains} =  defineProps(['chains'])
const tabs = Object.keys(chains)
const current = ref("*")
const setCurrent = (val) => current.value=val
const defaultColors = [[256, 0, 0], [256, 0, 256], [0, 256, 256], [0, 0, 256], [0, 256, 0]]
const space = " "

const customColors = [ [256,256,256] ]

const addCustomColor = () => {
  const color = [Math.round(Math.random() * 256), Math.round(Math.random() * 256), Math.round(Math.random() * 256)] 
  if (customColors.length < 5) {
    customColors.push(color)
    colors.length = 0
    colors.push(...defaultColors)
    colors.push(...customColors)
  }
}

const colors = reactive([...defaultColors, ...customColors])
</script>