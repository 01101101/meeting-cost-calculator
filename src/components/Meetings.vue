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
        :class="['h-4 rounded-sm cursor-pointer hover:bg-blue-100', ['bg-gray-200', 'bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500', 'bg-green-600', 'bg-green-700', 'bg-green-800', 'bg-green-900'][store.state.meetings[day].duration]]"
        @mouseover="currentDay = day"
        @mouseout="currentDay = -1"
        @click="increment(day)"></div>
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
    return meetingDuration !== 0 ? `${date} | ${meetingDuration}h` : date
  }
  const meetingsDuration = store.state.meetings.reduce((total, meeting) => total + meeting.duration, 0)
  return meetingsDuration === 0 ? 'No meetings' : `${meetingsDuration}h of meetings this year`
})

const reset = () => store.dispatch('updateMeetingsDuration', Array(365).fill(0))

const daily = () => {
  reset()
  store.dispatch('updateMeetingsDuration', Array.from({ length: 365 }, (_, day) => {
    const dayOfWeek = new Date(new Date().getFullYear(), 0, day + 1).getDay()
    return dayOfWeek === 0 || dayOfWeek === 6 ? 0 : 2
  }))
}

const weekly = () => {
  reset()
  store.dispatch('updateMeetingsDuration', Array.from({ length: 365 }, (_, day) => {
    const dayOfWeek = new Date(new Date().getFullYear(), 0, day + 1).getDay()
    return dayOfWeek === 1 ? 2 : 0
  }))
}

const monthly = () => {
  reset()
  store.dispatch('updateMeetingsDuration', Array.from({ length: 365 }, (_, day) => {
    const dayOfMonth = new Date(new Date().getFullYear(), 0, day + 1).getDate()
    return dayOfMonth === 1 ? 2 : 0
  }))
}

const increment = (day: number) => store.dispatch('incrementMeeting', day)
</script>
