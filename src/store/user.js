import Vue from 'vue'
import Vuex from 'vuex'
import { userService } from '../services';

Vue.use(Vuex)

const state = {
    users: []
};
const mutations = {
    getUsers(state, users) {
        state.users = users
    },
    deleteUser(state, userId) {
        state.users = [...state.users.filter(u => u._id != userId)];
    },
};
const actions = {
    async loadUserAction({ commit }) {
        const users = await userService.getAll();
        commit('getUsers', users)
    },
    async deleteUser({ commit }, user) {
        let userId = await userService.deleteUser(user);
        return commit('deleteUser', userId)
    },
};

const getters = {

};

export const user = {
    state,
    mutations,
    actions,
    getters,
}