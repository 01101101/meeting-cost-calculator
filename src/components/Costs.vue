<template>
  <div class="md:text-right">
    <h1 class="text-3xl">Costs</h1>
    <h2 class="mt-4 font-bold text-2xl text-gray-400">{{  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totalCosts) }}</h2>
    <div class="mt-2 text-2xl flex items-center md:justify-end"><img src="../assets/logo.svg" alt="WEDO logo" class="w-20 mr-2"><span class="font-extrabold text-blue-400">{{  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totalCostsWithWedo) }}</span></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '../store'

const store = useStore()

const totalCosts = computed(() => store.getters.totalCosts)
const totalCostsWithWedo = computed(() => store.getters.totalCosts * 0.7)
</script>
