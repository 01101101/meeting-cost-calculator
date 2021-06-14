import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

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
  },
  actions: {
    addParticipant({ commit }) {
      commit('addParticipant')
    },
    removeParticipant({ commit }, id) {
      commit('removeParticipant', id)
    },
  }
})

export const useStore = () => baseUseStore(key)
