<script setup>
import MolecularViewer from "./components/MolecularViewer.vue";
import ColorPicker from "./components/ColorPicker.vue";
import LoupedeckListener from "./components/LoupedeckListener.vue";
import VisualizationRadioGroup from './components/VisualizationRadioGroup.vue';
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

let visualStyle = ref("cartoon");

async function loadpdb(pdbcode) {
  entryId.value = pdbcode;
  chains.value = await getInChainsValues(pdbcode);

  // insert chain * at beginning of chain list
  chains.value = ["*"].concat(chains.value);

  //foreach chain insert hsl object
  chains.value.forEach((chain) => {
    if (chain == "*") {
      chainColors.value[chain] = { h: 0, s: 100, l: 50 };
    }
    else {
      chainColors.value[chain] = null
    }
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

let showModal = ref(false)

function vectorize() {
  loading.value = true;
  showModal.value = true;
  pdbview.value.vectorize()
}

let generated_svg_url = ref("")
function displayUrl(url) {
  loading.value = false;
  generated_svg_url = url;
}
// let hideViewer = ref(true)
function structureLoaded() {
  setTimeout(function () {
    chainColors.value['*'] = { h: 0, s: 99, l: 50 }
    // hideViewer.value = false
  }, 700);
}
</script>

<template>
  <div class="container mx-auto w-full py-4">
    <div class="mx-auto max-w-2xl text-center py-4">


      <div class="flex flex-col space-y-2 justify-center w-full py-2">
        <h1 class="text-3xl font-bold">PDB2Vector</h1>
        <p>Vectorize any protein image easily from 3D to SVG.</p>
      </div>
      <LoupedeckListener @color-changed="updateColor" @chain-changed="updateTarget" :chains="chains"
        :chain-colors="chainColors" :currentTarget="currentTarget" />

      <transition>
        <!-- ToDO make component look nice, display loading -->
        <PDBInput @load="loadpdb" v-if="!showViewer" class="w-full" />
      </transition>
    </div>
    <LoupedeckListener @color-changed="updateColor" @chain-changed="updateTarget" @export-pushed="vectorize()"
      :chains="chains" :chain-colors="chainColors" :currentTarget="currentTarget" />



    <!-- animate transition -->
    <transition>
      <div v-if="showViewer" class="px-8"> <!--:class="hideViewer ? 'hidden' : ''" -->
        <div class="py-2 flex justify-end">
          <div class="flex justify-start">
            <VisualizationRadioGroup @update-visualization="(style) => { visualStyle = style; }" />
          </div>

          <Btn @clicked="vectorize()" label="Vectorize" />
        </div>
        <div class="flex">
          <div class="w-1/4 px-2">
            <hr class="py-2">
            <div class="uppercase font-medium text-gray-800 my-4 text-xs">
              Colors
            </div>
            <ColorPicker @colorchanged="updateColor" @chain-changed="updateTarget" :chains="chainColors"
              :current-target="currentTarget" />
          </div>
          <div class="w-3/4">
            <MolecularViewer :pdb="entryId" :colors="chainColors" @loading-completed="displayUrl"
              :visual-style="visualStyle" :structureloaded="structureLoaded()" ref="pdbview" />

          </div>
        </div>




        <div v-if="showModal">
          <div
            class="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster"
            style="background: rgba(0,0,0,.7);">
            <div
              class="border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div class="modal-content py-4 text-left px-6">
                <!--Title-->
                <div class="flex justify-between items-center pb-3">
                  <p class="text-2xl font-bold">Vectorizing</p>
                  <div class="modal-close cursor-pointer z-50" @click="showModal">
                    <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                      viewBox="0 0 18 18">
                      <path
                        d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
                      </path>
                    </svg>
                  </div>
                </div>
                <!--Body-->
                <div class="flex flex-col justify-center space-y-2" v-if="loading">
                  <div class="text-gray-800 my-4 text-sm w-full">
                    Hang tight while we vectorize your protein...
                  </div>
                  <LoadingSpinner />

                </div>

                <div v-if="generated_svg_url" class="flex flex-col justify-center space-y-2">
                  <div class="text-gray-800 my-4 text-sm">
                    Your vectorized protein is ready!
                  </div>

                  <a :href="generated_svg_url" download="vectorized.svg" target="_blank"
                    class="btn btn-primary">Download</a>
                </div>

              </div>
            </div>
          </div>



        </div>
      </div>


    </transition>
  </div>
</template>

<style scoped></style>
