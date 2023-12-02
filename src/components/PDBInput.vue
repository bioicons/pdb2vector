<template>
    <div>
        <input type="text" placeholder="PDB Code" v-model="pdb">
        <button @click="load">Fetch</button>
    </div>
</template>

<script setup>

import { ref } from 'vue'

const pdb = ref('1pga')
const emit = defineEmits(['load'])
// emit load event with pdb code if pdb code is valid
function load() {
    if (pdb.value.length == 4) {
        emit('load', pdb.value)
    }
}
</script>

<style></style>