import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

const WorkedDaysPerYear = 261
const WorkedHoursPerDay = 8
const WorkedHoursPerYear = WorkedDaysPerYear * WorkedHoursPerDay

export interface Participant {
  id: string
  name: string
  salary: number
}

export interface Meeting {
  day: number
  duration: number
}

export interface State {
  participants: Participant[],
  meetings: Meeting[]
}
  
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    participants: [],
    meetings: Array.from({ length: 365 }, (_, day) => ({ day, duration: 0 })),
  },
  getters: {
    totalCosts(state) {
      const hourlyCost = state.participants.reduce((total, participant) => total + participant.salary / WorkedHoursPerYear, 0)
      const meetingsDuration = state.meetings.reduce((total, meeting) => total + meeting.duration, 0)
      return meetingsDuration * hourlyCost
    },
  },
  mutations: {
    addParticipant(state) {
      state.participants.push({
        id: Math.random().toString(36).substr(2, 9),
        name: `Participant ${state.participants.length}`,
        salary: 100000
      })
    },
    removeParticipant(state, id) {
      state.participants = state.participants.filter(participant => participant.id !== id)
    },
    updateParticipant(state, { id, properties }) {
      Object.assign(state.participants.find(participant => participant.id === id), properties)
    },
  },
  actions: {
    addParticipant({ commit }) {
      commit('addParticipant')
    },
    removeParticipant({ commit }, id) {
      commit('removeParticipant', id)
    },
    updateParticipantName({ commit }, { id, name }) {
      commit('updateParticipant', { id, properties: { name } })
    },
    updateParticipantSalary({ commit }, { id, salary }) {
      commit('updateParticipant', { id, properties: { salary } })
    },
  }
})

export const useStore = () => baseUseStore(key)
