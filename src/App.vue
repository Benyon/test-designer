<template>
	<NavBar :showLinks='state.showLinks'/>
	<div class="container">
        <router-view :loaded="state.loaded"/>
	</div>
</template>

<script>
import NavBar from '@/components/NavBar'
import { onBeforeMount, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
    components: { NavBar },

	setup() {
		const router = useRouter();
		const route = useRoute();
		const state = reactive({
            loaded: false,
            showLinks: true
        })

		onBeforeMount(() => {
			firebase.auth().onAuthStateChanged((user) => {
                const rawRoute = route.path.toLowerCase().split(/(\/[0-9])/)[0];
				if (!user && ['/account', '/library', '/test'].includes(rawRoute)) { // Not logged in and try to land on an auth page.
					router.replace('/login')
                } else if (user && (route.path == '/register' || route.path == '/login')) { // Logged in and on the login step pages.
					router.replace('/account')
                }
                //state.loaded = true;
			})
        })

		return {
            state
		}
	}
}
</script>