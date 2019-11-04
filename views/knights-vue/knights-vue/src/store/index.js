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
    },
    REMOVE_WEAPON(state, weaponToBeDeleted) {
      return  state.weapons = state.weapons.filter(weapon => weapon.id !== weaponToBeDeleted.id)
    }
  },
  actions: {
    AddWeapon(context, newWeapon) {
      return context.commit("SET_NEW_WEAPON", newWeapon)
    },
    RemoveWeapon(context, weaponToBeDeleted) {
      return context.commit("REMOVE_WEAPON", weaponToBeDeleted)
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
