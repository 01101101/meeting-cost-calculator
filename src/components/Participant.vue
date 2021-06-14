<template>
  <div class="bg-white px-4 py-3 rounded-lg shadow-lg grid grid-cols-2 gap-2 items-center h-14 relative">
    <svg @click="remove()" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute -left-8 text-gray-300 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
    <span v-if="!editingName" @click="editingName = true" class="cursor-pointer">{{ participant.name }}</span>
    <input v-else type="text" v-model="name" @blur="updateName()" class="outline-none border-b-2 border-blue-400 py-1" v-focus>
    <span v-if="!editingSalary" @click="editingSalary = true" class="font-bold cursor-pointer text-right">{{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(participant.salary) }}</span>
    <input v-else type="number" v-model.number="salary" @blur="updateSalary()" class="outline-none border-b-2 border-blue-400 py-1 text-right" v-focus>
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

const name = ref(props.participant.name)
const editingName = ref(false)
const updateName = () => {
  editingName.value = false
  store.dispatch('updateParticipantName', { id: props.participant.id, name: name.value })
}

const salary = ref(props.participant.salary)
const editingSalary = ref(false)
const updateSalary = () => {
  editingSalary.value = false
  store.dispatch('updateParticipantSalary', { id: props.participant.id, salary: salary.value })
}

const remove = () => store.dispatch('removeParticipant', props.participant.id)
</script>
