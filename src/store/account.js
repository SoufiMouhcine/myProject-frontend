import Vue from 'vue'
import Vuex from 'vuex'
import { userService } from '../services';
import { REGISTER } from "./mutation-type";
import { LOGIN } from "./mutation-type";
import { LOGOUT } from "./mutation-type";
import router from '../router/index';

Vue.use(Vuex)

const state = {
    register: [],
    login: {
        loggedIn: false,
    }
};
const mutations = {
    [REGISTER](state, register) {
        state.register.push(register)
    },
    [LOGIN](state, login) {
        state.login = login
        state.login.loggedIn = true
        console.log(state.login)
        console.log(state.login.user.firstName)
        localStorage.setItem('token', state.login.token)
        localStorage.setItem('userId', state.login.user._id)

    },
    [LOGOUT](state) {
        state.login.loggedIn = false;
        state.login = [];
    }
};
const actions = {
    async registerAction({ commit }, user) {
        const register = await userService.register(user);
        if (register == null) {
            return alert("email already exist")
        } else {
            alert("compte créer avec succes");
            router.push({ name: "login" });
            return commit(REGISTER, register)
        }
    },

    async loginAction({ commit }, user) {
        const login = await userService.login(user);
        console.log("loginAction " + login)
        if (login == null) {
            return alert("Email et ou mot de passe incorrect")
        } else {
            commit(LOGIN, login)
            return router.push('/users');

        }
    },

    logoutAction({ commit }) {
        userService.logout();
        commit(LOGOUT)
    }
};
const getters = {}

export const account = {
    state,
    mutations,
    actions,
    getters,
}