import Vue from 'vue'
import Vuex from 'vuex'
import { userService } from '../services';

Vue.use(Vuex)

const state = {
    users: []
};
const mutations = {
    getUsers(state, users) {
        let userId = localStorage.getItem('userId')
        state.users = users
        state.users = [...state.users.filter(u => u._id != userId)];

    },
    deleteUser(state, userId) {
        state.users = [...state.users.filter(u => u._id != userId)];
    },
    addUser(state, addeduser) {
        console.log(addeduser)
        state.users.push(addeduser.data);
    },
};
const actions = {
    async loadUserAction({ commit }) {
        const users = await userService.getAll();
        commit('getUsers', users)
    },
    async deleteUserAction({ commit }, user) {
        let userId = await userService.deleteUser(user);
        return commit('deleteUser', userId)
    },
    async addUserAction({ commit }, user) {
        let addeduser = await userService.addUser(user);
        return commit('addUser', addeduser)
    },
};

const getters = {
    getUserById: state => id => state.users.find(u => u._id === id),


};

export const user = {
    state,
    mutations,
    actions,
    getters,
}