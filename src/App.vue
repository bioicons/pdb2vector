<script setup>
import MolecularViewer from "./components/MolecularViewer.vue";
import ColorPicker from "./components/ColorPicker.vue";
import LoupedeckListener from "./components/LoupedeckListener.vue";
import VisualizationRadioGroup from './components/VisualizationRadioGroup.vue';

import PDBInput from './components/PDBInput.vue';

import Btn from './components/Btn.vue';
import { ref } from 'vue';


async function getInChainsValues(entryId) {
  const apiUrl = `https://www.ebi.ac.uk/pdbe/api/pdb/entry/molecules/${entryId}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data[entryId]) {
      const molecules = data[entryId];
      const inChainsValues = molecules
        .map((molecule) => molecule.in_chains)
        .flat();
      return Array.from(new Set(inChainsValues));
    } else {
      throw new Error(`Entry ${entryId} not found`);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
}

let entryId = ref("1pga");
let chains = ref([]);

let chainColors = ref({});

let showViewer = ref(false);

let currentTarget = ref("*");

let visualStyle = ref("cartoon");

async function loadpdb(pdbcode) {
  entryId.value = pdbcode;
  chains.value = await getInChainsValues(pdbcode);

  // insert chain * at beginning of chain list
  chains.value = ["*"].concat(chains.value);

  //foreach chain insert hsl object
  chains.value.forEach((chain) => {
    chainColors.value[chain] = { h: 0, s: 0, l: 0 };
  });
  showViewer.value = true;
}

function updateColor(color) {
  chainColors.value[currentTarget.value] = color
}

function updateTarget(target) {
  currentTarget.value = target
}

const pdbview = ref(null)

let loading = ref(false)
function vectorize() {
  loading.value = true
  pdbview.value.vectorize()
  loading.value = false
}

</script>

<template>
  <div>
    <h1 class="text-xl font-bold">PDB2Vector</h1>

    <LoupedeckListener
      @color-changed="updateColor"
      @chain-changed="updateTarget"
      :chains="chains"
      :chain-colors="chainColors"
      :current-target="currentTarget"
    />

    <!-- ToDO make component look nice, display loading -->
    <PDBInput @load="loadpdb" />

    <code>
                                                 {{ JSON.stringify(chainColors) }}
                                                 {{ JSON.stringify(currentTarget) }}
                                                </code>
    <!-- animate transition -->
    <transition>
      <div v-if="showViewer">
        <div class="flex">
          <div class="w-1/2">
            <ColorPicker
              @colorchanged="updateColor"
              @chainchanged="updateTarget"
            />
            <div class="mt-4 max-w-[90%] mx-auto">
              <VisualizationRadioGroup @update-visualization="(style) => {visualStyle = style;}"/>
            </div>
          </div>
          <div class="w-1/2">
            <MolecularViewer :pdb="entryId" :colors="chainColors" :visual-style="visualStyle" ref="pdbview" />
          </div>
        </div>
        <div class="my-6 flex items-center justify-center">
          <Btn @clicked="vectorize()" label="Vectorize" />

          <div v-if="loading">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z">
              </path>
            </svg>
          </div>

        </div>

      </div>


    </transition>
  </div>
</template>

<style scoped></style>
