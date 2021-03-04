import Vue from 'vue'
import Vuex from 'vuex'
import { departementService } from '../services';
//import router from '../router/index';

Vue.use(Vuex)

const state = {
    departements: []
};
const mutations = {
    getdepartements(state, departements) {
        state.departements = departements;
        console.log("state" + state.departements)
    },
    deleteDepartement(state, departementId) {
        console.log(state.departements)
        state.departements = [...state.departements.filter(d => d._id != departementId)];
    },
    updateDep(state, updatedDep) {
        const index = state.departements.findIndex(d => d._id === updatedDep._id);
        state.departements.splice(index, 1, updatedDep);
        state.departements = [...state.departements];
    },
    addedDepartement(state, addedDepartement) {
        state.departements.push(addedDepartement)
    }
};
const actions = {
    async getDepartementsAction({ commit }) {
        const departements = await departementService.getDepartements();
        console.log("mouhcine3" + departements)
        return commit('getdepartements', departements)
    },
    async deleteDepartement({ commit }, departement) {
        let departementId = await departementService.deleteDepartement(departement);
        return commit('deleteDepartement', departementId)
    },
    async updateDepartement({ commit }, { name, departement }) {
        console.log("action dep name" + name + "action dep ID" + departement._id)
        const updatedDep = await departementService.updateDepartement(departement, name)
        return commit('updateDep', updatedDep)
    },
    async AddDepartement({ commit }, name) {
        console.log("action " + name)
        let addedDepartement = await departementService.addDepartement(name);
        return commit('addDepartement', addedDepartement)
    },

};

const getters = {}

export const departement = {
    state,
    mutations,
    actions,
    getters,
}