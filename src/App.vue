<script setup>
import Settings from './components/Settings.vue'
import MolecularViewer from './components/MolecularViewer.vue';
</script>

<template>
  <div>
    <h1 class="text-xl font-bold">PDB2Vector</h1>

    <div class="flex">
      <div class="w-1/2">
        <MolecularViewer />
      </div>
      <div class="w-1/2">
        <Settings />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
