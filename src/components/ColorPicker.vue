<template>
  <div>
    <div>
      <label for="tabs" class="sr-only">Chain</label>
      <div class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
        <button v-for="chain in tabs" :key="chain"
          :class="[[chain == currentchain ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700', 'rounded-md px-3 py-2 text-sm font-medium']]"
          @click="setcurrentchain(chain)">{{ chain }}</button>
      </div>
    </div>
    <button as="div" :class="[currentchain == '*' && 'hidden', 'flex items-center py-1']"
      @click="enableCustomColor(currentchain)">
      <div
        :class="[chains[currentchain] ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
        <span aria-hidden="true"
          :class="[chains[currentchain] ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
      </div>
      <div as="span" class="ml-3 text-sm">
        <span class="font-medium text-gray-900">Use custom color</span>
      </div>
    </button>
    <div v-if="color" class="w-72">
      <RadioGroup v-model="chains[currentchain]" class="pb-4">
        <RadioGroupLabel class="block text-sm font-medium leading-6 text-gray-900">Pick chain color</RadioGroupLabel>
        <div class="grid grid-cols-5 gap-4">
          <RadioGroupOption as="template" v-for="color in colors" :key="color" :value="color"
            v-slot="{ active, checked }">
            <div
              :class="[active && checked ? ' ring ring-offset-1' : '', !active && checked ? 'ring-2' : '', 'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-700']">
              <span aria-hidden="true" class='h-8 w-8 rounded-full border border-black border-opacity-10'
                :style="{ 'background-color': `${formatHSL(color)}` }" />
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
      <div>
        <color-picker variant='persistent' :hue="color.h" :saturation="color.s" :luminosity="color.l"
          @input="updateChannel" />
        <div>Saturation:</div>
        <input id="large-range" type="range" :value="color.s"
          :onchange="(change) => updateChannel(change.target.valueAsNumber, 's')"
          class="w-full h-6 rounded-lg bg-gray-200 appearance-none ::--webkit-slider-thumb:appeareance-none cursor-pointer range-lg dark:bg-gray-700"
          :style="`background: linear-gradient(to right, hsl(${color.h} 0% ${color.l}%), hsl(${color.h} 100% ${color.l}%))`">
        <div>Luminosity:</div>
        <input id="large-range" type="range" :value="color.l"
          :onchange="(change) => updateChannel(change.target.valueAsNumber, 'l')"
          class="w-full h-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg dark:bg-gray-700"
          :style="`background: linear-gradient(to right, hsl(${color.h} ${color.s}% 0%), hsl(${color.h} ${color.s}% 100%))`">

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import ColorPicker from '@radial-color-picker/vue-color-picker';

const emit = defineEmits(["chainChanged"]);


const props = defineProps({
  chains: Object,
  // chainColors: Object,
  currentTarget: String,
});

// const props = defineProps(['chains'])
const chains = props.chains
const currentchain = ref(props.currentTarget)

const tabs = Object.keys(props.chains).length > 2 ? Object.keys(props.chains) : ['*']
const color = computed(() => chains[currentchain.value])

const defaultColors = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => { return { h: Math.round((360 * i) / 10), s: 100, l: 50 } })
const colors = reactive([chains["*"], ...defaultColors])
const formatHSL = (hsl) => `hsl(${hsl.h} ${hsl.s}% ${hsl.l}%`

const setcurrentchain = (val) => {
  currentchain.value = val
  emit('chainChanged', val)
}
const enableCustomColor = (chain) => {
  if (chains[chain] == null) {
    chains[chain] = colors[0]
  } else {
    chains[chain] = null
  }
}
const updateChannel = (value, channel = 'h') => {
  chains[currentchain.value][channel] = value
}

</script>

<style>
@import '@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';
</style>

<style>
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: none;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background: white;
  margin-top: 0px;
}
</style>