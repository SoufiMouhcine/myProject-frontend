import Vue from 'vue'
import Vuex from 'vuex'

import { account } from "./account"
import { departement } from "./departement"
import { user } from "./user"

Vue.use(Vuex)



export default new Vuex.Store({
    modules: {
        account,
        departement,
        user
    }
})