import Vue from 'vue'
import Vuex from 'vuex'

import { account } from "./account"
import { departement } from "./departement"
Vue.use(Vuex)



export default new Vuex.Store({
    modules: {
        account,
        departement
    }
})