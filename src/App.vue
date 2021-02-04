<template>
	<NavBar :showLinks='state.showLinks' :user='state.user' :loaded='state.loaded'/>
	<div v-if='state.loaded' class="container">
        <router-view :user='state.user'/>
	</div>
    <Footer/>
</template>

<script>
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { onBeforeMount, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { CommonUtility } from './assets/common'
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
    components: { NavBar, Footer },

	setup() {
		const router = useRouter();
		const route = useRoute();
		const state = reactive({
            loaded: false,
            showLinks: false,
            user: null
        })

        function queryRedirect(user, rawRoute) {
            if (!user && ['/account', '/library', '/test'].includes(rawRoute)) { // Not logged in and try to land on an auth page.
                router.replace('/login')
            } else if (user && (route.path == '/register' || route.path == '/login')) { // Logged in and on the login step pages.
                router.replace('/')
            }

            setTimeout(()=>{
                state.loaded = true;
            }, 300)
        }

        watch(
            () => route.params,
            async () => {
                state.user = firebase.auth().currentUser;
                let rawRoute = CommonUtility.urlTrim(route.path);
                queryRedirect(state.user, rawRoute);
            }
        )

		onBeforeMount(() => {
			firebase.auth().onAuthStateChanged((user) => {
                let rawRoute = CommonUtility.urlTrim(route.path);
                state.user = user;
                queryRedirect(state.user, rawRoute);
			})
        })

		return {
            state
		}
	}
}
</script>