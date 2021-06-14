<template>
  <div>
    <div class="flex items-baseline justify-between">
      <div class="text-3xl">
        <h1>Meetings</h1>
        <span class="text-lg text-gray-400">{{ currentDayDescription }}</span>
      </div>
      <menu class="flex gap-2 text-blue-400">
        <button class="focus:outline-none" @click="reset()">Reset</button>
        <button class="focus:outline-none" @click="daily()">Daily</button>
        <button class="focus:outline-none" @click="weekly()">Weekly</button>
        <button class="focus:outline-none" @click="monthly()">Monthly</button>
      </menu>
    </div>
    <div class="mt-4 grid grid-rows-7 grid-flow-col gap-1">
      <div
        v-for="(_ , day) in 365"
        :key="day"
        :class="['h-4 rounded-sm cursor-pointer hover:bg-blue-100', ['bg-gray-200', 'bg-green-400', 'bg-yellow-400', 'bg-red-400'][store.state.meetings[day].duration]]"
        @mouseover="currentDay = day"
        @mouseout="currentDay = -1"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '../store'

const store = useStore()

const currentDay = ref(-1)
const currentDayDescription = computed(() => {
  if (currentDay.value != -1) {
    const date = new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(new Date().getFullYear(), 0, currentDay.value + 1))
    const meetingDuration = store.state.meetings[currentDay.value].duration
    return meetingDuration !== 0 ? `$date | ${meetingDuration}h` : date
  }
  const meetingsDuration = store.state.meetings.reduce((total, meeting) => total + meeting.duration, 0)
  return meetingsDuration === 0 ? 'No meetings' : `${meetingsDuration}h of meetings this year`
})

const reset = () => {}

const daily = () => {
  reset()
}

const weekly = () => {
  reset()
}

const monthly = () => {
  reset()
}
</script>
