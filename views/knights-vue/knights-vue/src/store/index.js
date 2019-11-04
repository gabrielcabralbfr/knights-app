import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    weapons: [{
      id: 0,
      name: "",
      mod: 0,
      attribute: "",
      equipped: false
    }]
  },
  mutations: {
    SET_NEW_WEAPON(state, newWeapon) {
      return state.weapons.push(newWeapon)
    }
  },
  actions: {
    AddWeapon(context, newWeapon) {
      return context.commit("SET_NEW_WEAPON", newWeapon)
    }
  },
  getters: {
    getWeapons(state) {
      return state.weapons
    }
  },
  modules: {
  }
})
