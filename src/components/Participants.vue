<template>
  <div>
    <h1 class="text-3xl">Participants</h1>
    <div class="mt-4 flex flex-col gap-3">
      <Participant v-for="participant in store.state.participants" :key="participant.id" :participant="participant"/>
      <button class="text-blue-400 text-left focus:outline-none" @click="add()">Add participant</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../store'
import Participant from './Participant.vue'

const store = useStore()

const add = () => store.dispatch('addParticipant')
</script>
