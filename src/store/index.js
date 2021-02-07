import { createStore } from 'vuex'

export default createStore({
    state: {
        loggedIn: false
    },

    mutations: {

        logIn(state) {
            state.loggedIn = true;
        },

        logOut(state) {
            state.loggedIn = false;
        }

    },

    actions: {

        LOG_IN({commit}) {
            commit('logIn');
        },

        LOG_OUT({commit}) {
            commit('logOut');
        }
        
    },

    modules: {

    }
})
