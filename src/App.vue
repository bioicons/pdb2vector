<script setup>
import MolecularViewer from "./components/MolecularViewer.vue";
import ColorPicker from "./components/ColorPicker.vue";
import LoupedeckListener from "./components/LoupedeckListener.vue";
</script>

<template>
  <div>
    <h1 class="text-xl font-bold">PDB2Vector</h1>
    <LoupedeckListener />
    <div class="flex">
      <div class="w-1/2">
        <ColorPicker />
      </div>
      <div class="w-1/2">
        <MolecularViewer />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
