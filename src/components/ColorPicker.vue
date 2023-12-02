<template>
  <div>
    <label for="tabs" class="sr-only">Chain</label>
    <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
    <div class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
      <button v-for="tab in tabs" :key="tab"
        :class="[[tab == current ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700', 'rounded-md px-3 py-2 text-sm font-medium']]"
        @click="setCurrent(tab)">{{ tab }}</button>
    </div>
  </div>
  <button as="div" :class="[current == '*' && 'hidden', 'flex items-center']" @click="enableCustomColor(current)">
    <div
      :class="[chains[current] ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
      <span aria-hidden="true"
        :class="[chains[current] ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
    </div>
    <div as="span" class="ml-3 text-sm">
      <span class="font-medium text-gray-900">Use custom color</span>
    </div>
  </button>
  <div :class="[chains[current] == null && 'hidden', 'w-60']">
    <RadioGroup v-model="chains[current]">
      <RadioGroupLabel class="block text-sm font-medium leading-6 text-gray-900">Choose a label color</RadioGroupLabel>
      <div class="grid grid-cols-5 gap-4">
        <RadioGroupOption as="template" v-for="color in colors" :key="color" :value="color" v-slot="{ active, checked }">
          <div
            :class="[active && checked ? ' ring ring-offset-1' : '', !active && checked ? 'ring-2' : '', 'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-700']">
            <span aria-hidden="true" class='h-8 w-8 rounded-full border border-black border-opacity-10'
              :style="{ 'background-color': `rgb(${color.join(' ')})` }" />
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
    <color-picker variant='persistent' @input="updateColor" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import ColorPicker from '@radial-color-picker/vue-color-picker';

const { chains } = defineProps(['chains'])
const tabs = Object.keys(chains)
const current = ref("*")

const defaultColors = [[256, 0, 256], [0, 256, 256], [0, 0, 256], [0, 256, 0], [0, 0, 0], [256, 256, 256], [0, 128, 256], [256, 0, 128], [128, 0, 256]]
const colors = reactive([chains["*"], ...defaultColors])


const setCurrent = (val) => current.value = val
const enableCustomColor = (chain) => {
  if (chains[chain] == null) {
    chains[chain] = colors[0]
  } else {
    chains[chain] = null
  }
}
const updateColor = (value) => {
  const rgb = HSL2RGB(value, 100, 50)
  chains[current.value].length = 0
  chains[current.value].push(...rgb)
}
const HSL2RGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

</script>

<style>
@import '@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';</style>