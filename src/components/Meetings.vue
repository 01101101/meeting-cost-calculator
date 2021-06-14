<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="text-3xl">Meetings</h1>
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
        :class="['h-4 rounded-sm cursor-pointer hover:bg-blue-100', ['bg-gray-200', 'bg-green-400', 'bg-yellow-400', 'bg-red-400'][store.state.meetings[day].duration]]"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../store'

const store = useStore()

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
