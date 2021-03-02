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
        console.log("state" + state.departements[0].name)
    },
    deleteDepartement(state, departementId) {
        state.departements = [...state.departements.filters(d => d._id != departementId)];
    }
};
const actions = {
    async getDepartementsAction({ commit }) {
        console.log('aciton')
        const departements = await departementService.getDepartements();
        console.log("mouhcine3" + departements)
        return commit('getdepartements', departements)
    },
    async deleteDepartement({ commit }, departement) {
        let departementId = await departementService.deleteDepartement(departement);
        return commit('deleteDepartement', departementId)
    },
};

const getters = {}

export const departement = {
    state,
    mutations,
    actions,
    getters,
}