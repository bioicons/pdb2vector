<script setup>
import MolecularViewer from "./components/MolecularViewer.vue";
import ColorPicker from "./components/ColorPicker.vue";
import LoupedeckListener from "./components/LoupedeckListener.vue";
import { reactive } from "vue";

const chains = reactive({'*': [0,100,50], 'a': null, 'b': null, 'c': null})
</script>

<template>
  <div>
    <h1 class="text-xl font-bold">PDB2Vector</h1>
    <LoupedeckListener />
    <div class="flex">
      <div class="w-1/2">
        <ColorPicker :chains="chains"/>
      </div>
      <div class="w-1/2">
        <MolecularViewer />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
