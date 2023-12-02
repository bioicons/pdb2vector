<script setup>

import MolecularViewer from "./components/MolecularViewer.vue";
import ColorPicker from "./components/ColorPicker.vue";
import LoupedeckListener from "./components/LoupedeckListener.vue";

import PDBInput from './components/PDBInput.vue';
import { ref } from 'vue';


async function getInChainsValues(entryId) {
  const apiUrl = `https://www.ebi.ac.uk/pdbe/api/pdb/entry/molecules/${entryId}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data[entryId]) {
      const molecules = data[entryId];
      const inChainsValues = molecules.map(molecule => molecule.in_chains).flat();
      return Array.from(new Set(inChainsValues));
    } else {
      throw new Error(`Entry ${entryId} not found`);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
}



let entryId = ref("1pga")
let chains = ref([])

let chainColors = ref({})

let showViewer = ref(false)

let currentTarget = ref("*")


async function loadpdb(pdbcode) {

  entryId.value = pdbcode
  chains.value = await getInChainsValues(pdbcode)

  // insert chain * at beginning of chain list
  chains.value = ["*"].concat(chains.value)



  //foreach chain insert hsl object
  chains.value.forEach(chain => {
    chainColors.value[chain] = { h: 0, s: 0, l: 0 }
  })
  showViewer.value = true
}

function updateColor(color) {
  alert("update color")
  chainColors.value[currentTarget] = color
}

function updateTarget(target) {
  alert("update target")
  currentTarget.value = target
}


</script>

<template>
  <div>
    <h1 class="text-xl font-bold">PDB2Vector</h1>

    <LoupedeckListener @color-changed="updateColor" @chain-changed="updateTarget" />

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
            <ColorPicker @colorchanged="updateColor" @chainchanged="updateTarget" />
          </div>
          <div class="w-1/2">
            <MolecularViewer :pdb="entryId" :colors="chainColors" />
          </div>
        </div>

      </div>
    </transition>

  </div>
</template>

<style scoped></style>
