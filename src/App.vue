<template>
  <div class="p-20 grid gap-8 grid-cols-1 md:grid-cols-2">
    <Meetings class="md:col-span-2"/>
    <Participants/>
    <Costs/>
  </div>
</template>

<script setup lang="ts">
import Participants from './components/Participants.vue'
import Meetings from './components/Meetings.vue'
import Costs from './components/Costs.vue'
</script>
