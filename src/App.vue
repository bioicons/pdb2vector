<script setup>
import MolecularViewer from "./components/MolecularViewer.vue";
import ColorPicker from "./components/ColorPicker.vue";
import LoupedeckListener from "./components/LoupedeckListener.vue";
import { reactive } from "vue";

// const chains = reactive({'*': [0,100,50], 'a': null, 'b': null, 'c': null})

import PDBInput from './components/PDBInput.vue';

import LoadingSpinner from "./components/LoadingSpinner.vue";

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
  loading.value = true;
  pdbview.value.vectorize()
}

</script>

<template>

  <div class="container mx-auto">
    <div class="flex flex-col space-y-2 justify-center w-full">
      <h1 class="text-3xl font-bold">PDB2Vector</h1>
      <p>Vectorize any protein image easily.</p>
    </div>
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
          </div>
          <div class="w-1/2">
            <MolecularViewer :pdb="entryId" :colors="chainColors" @loading-completed="loading = false" ref="pdbview" />
          </div>
        </div>
        <div class="my-6 flex items-center justify-center">
          <Btn @clicked="vectorize()" label="Vectorize" />






        </div>
        <div v-if="loading" class="flex flex-col justify-center space-y-2">
          <div class="text-gray-800 my-4 text-sm">
            Hang tight while we vectorize your protein...
          </div>
          <LoadingSpinner />

        </div>
      </div>


    </transition>
  </div>
</template>

<style scoped></style>
