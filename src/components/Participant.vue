<template>
  <div class="bg-white px-4 py-3 rounded-lg shadow-lg grid grid-cols-2 gap-2 items-center h-14 relative">
    <svg @click="remove()" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute -left-8 text-gray-300 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
    <span class="cursor-pointer">{{ participant.name }}</span>
    <span class="font-bold cursor-pointer text-right">{{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(participant.salary) }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import type { PropType } from 'vue'
import { useStore } from '../store'
import type { Participant } from '../store'

const store = useStore()

const props = defineProps({
  participant: {
    type: Object as PropType<Participant>,
    required: true,
  },
})

const remove = () => store.dispatch('removeParticipant', props.participant.id)
</script>
