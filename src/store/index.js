import Vue from 'vue'
import Vuex from 'vuex'
import { userService } from '../services';
import { REGISTER } from "./mutation-type";

Vue.use(Vuex)

const state = {
    register: [],
};
const mutations = {

};
const actions = {
    async registerAction({ commit }, user) {
        const register = await userService.register(user);
        commit(REGISTER, register)
    }
};
const getters = {}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
})