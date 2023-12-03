<template>
    <button type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        @click="$emit('clicked')">{{ props.label }}</button>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    label: String
})
</script>
