import { createStore } from 'vuex'
import { CommonUtility } from '../assets/common';
import router from '../router'

export default createStore({

    state: {
        loggedIn: false
    },

    mutations: {

        logIn(state) {
            state.loggedIn = true;
        },

        logOut(state) {

            // Fetch
            fetch(CommonUtility.config.api.BASE_URL + "/users/logout", { method: "get" })

            // Set store variables to false
            state.loggedIn = false;

            // Set storage variables to null
            localStorage.token = null
            localStorage.user = null
            
            // Redirect
            router.push('/');
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
